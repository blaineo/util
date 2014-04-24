/* global _, $, Backbone, Handlebars */
var Util = (function(_, $, Backbone, Handlebars) {
	/* exported Util */
	var Util = {
		version: "2.2.1",
		build: "Thu Apr 24 2014 11:37:16"
	};
	// jshint unused:false
	/*global Backbone, Util*/
	/* global _, Util */
	/* exported Logger */
	var Logger = (function() {
		var colors = {
			debug: "blue",
			info: "green",
			log: "#333",
			warn: "orange",
			error: "red"
		},
			noop = function() {},
			postMessage = window.postMessage || noop,
			consoleProps = ["debug", "log", "info", "error", "warn"],
			console = window.console || {};
		// pollyfill 
		_.each(consoleProps, function(prop) {
			if (!console[prop]) {
				console[prop] = noop;
			}
		});
	
		function Logger(name) {
			this.prefix = name || "Logger";
			_.bindAll(this, "debug", "info", "log", "warn", "error"); // so loggers can be event handlers.
		}
	
		function doLog(level, logger, args) {
			var loggers = Logger.getFilters();
			if (loggers.indexOf("all") !== -1 || logger.prefix.toLowerCase().indexOf(loggers) !== -1) {
				var prefix = "[" + logger.prefix + "]";
				args = _.toArray(args);
				postMessage("logMessage:<span style=\"color:" + colors[level] + "\">" + prefix + " " + args + "</span>", "*");
				args.unshift(prefix);
				console[level].apply(console, args);
			}
		}
		_.extend(Logger.prototype, {
			debug: function() {
				doLog("debug", this, arguments);
			},
			info: function() {
				doLog("info", this, arguments);
			},
			log: function() {
				doLog("log", this, arguments);
			},
			warn: function() {
				doLog("warn", this, arguments);
			},
			error: function() {
				doLog("error", this, arguments);
			}
		});
		Logger.getFilters = function() {
			if (!Logger.fiters) {
				return "";
			}
			return Logger.filters.toString().toLowerCase();
		};
		return Logger;
	})();
	Util.Logger = Logger;
	Util.extend = Backbone.Model.extend;
	Util.Events = Backbone.Events;
	/* global Util, Logger, _, Backbone*/
	/* exported Module */
	/**
	 * Simple base class functionality.
	 * Subclass get an options and a logger.
	 * An initialize method and a destroy method.
	 * And Backbone.Events.
	 */
	var Module = function(options) {
		this.options = options || {};
		this.logger = new Logger(this.options.loggerName || this.name || this.moduleId || "Logger");
		this.initialize.apply(this, arguments);
	};
	Module.prototype = {
		initialize: function() {},
		destroy: function() {
			this.stopListening();
		}
	};
	_.extend(Module.prototype, Backbone.Events);
	Module.extend = Util.extend;
	Util.Module = Module;
	/*global Util, _ */
	var templatePreprocess = function(text) {
	    // first, support legacy template format of {data}
	    return text.replace(/\{{1,}/g, "{{").replace(/\}{1,}/g, "}}")
	    // we need to both support {uri} and {uri.id}, there is an obvious conflict there.
	    .replace(/\{uri\./, "{uriParts.")
	    // last, scope the data, this lets us have undefined vars.
	    .replace(/\{{2,}/g, "{{data.");
	};
	
	/**
	 * text can be a single string, an object with string properites, or an array of strings.
	 */
	Util.template = function(text, data, keys) {
	    // parse strings like {uri}
	    if (_.isString(text)) {
	        return _.template(templatePreprocess(text), {
	            data: data
	        }, {
	            interpolate: /\{\{(.+?)\}\}/g
	        });
	    } else {
	        _(text).each(function(prop, key) {
	            if (!keys || _.contains(keys, key)) {
	                // do an extra check to make sure there is a template, perhaps enhancing performance.
	                if (_.isString(prop) && prop.indexOf("{") !== -1) {
	                    text[key] = _.template(templatePreprocess(prop), {
	                        data: data
	                    }, {
	                        interpolate: /\{\{(.+?)\}\}/g
	                    });
	                }
	            }
	        });
	        return text;
	    }
	};
	/**
	 * This is equivalent to the TemplateProxy in flash.
	 */
	Util.buildTemplateData = function(player, extraData) {
	    var data = _.extend({}, player.config, extraData),
	        splitUri = data.uri.split(":");
	    // build uri
	    data.uriParts = {
	        namespace: splitUri[3],
	        id: splitUri[4]
	    };
	    data.currentMetadata = player.currentMetadata ? player.currentMetadata : null;
	    // metadata for legacy
	    data.metadata = player.currentMetadata ? player.currentMetadata.rss : null;
	    data.playlistMetadata = player.playlistMetadata;
	    // future tempales can just access properties on the embed api.
	    data.player = player;
	    // legacy this is in flash player, not sure if used.
	    data.app = {
	        width: data.width,
	        height: data.height
	    };
	    return data;
	};
	/* global _, Backbone, Util*/
	/**
	 * Manage browser full screen methods for a variety of vendor prefixes.
	 */
	Util.FullScreen = (function(document) {
		var cancelFunc = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen,
			FullScreen = _.extend({}, Backbone.Events, {
				toggle: function(element) {
					if (FullScreen.isFullScreen()) {
						return FullScreen.cancelFullScreen();
					} else {
						return FullScreen.requestFullScreen(element);
					}
				},
				requestFullScreen: function(element) {
					element = element || document.documentElement;
					var requestFunc = element.requestFullScreen || element.mozRequestFullScreen || element.webkitRequestFullScreen;
					if (_.isFunction(requestFunc)) {
						requestFunc.call(element);
						return true;
					}
					return false;
				},
				cancelFullScreen: function() {
					if (_.isFunction(cancelFunc)) {
						cancelFunc.call(document);
						return true;
					}
					return false;
				},
				isFullScreen: function() {
					return ((document.fullScreenElement !== undefined && document.fullScreenElement !== null) || (document.mozFullScreen !== undefined && document.mozFullScreen === true) || (document.webkitIsFullScreen !== undefined && document.webkitIsFullScreen === true));
				},
				Events: {
					FULL_SCREEN_CHANGE: "fullscreenChange"
				}
			}),
			vendorFullscreenChange;
		if (document.fullScreenEnabled || document.fullscreenEnabled) {
			vendorFullscreenChange = "fullscreenchange";
		} else if (document.mozFullscreenEnabled || document.mozFullScreenEnabled) {
			vendorFullscreenChange = "mozfullscreenchange";
		} else if (document.webkitFullscreenEnabled || document.webkitFullScreenEnabled) {
			vendorFullscreenChange = "webkitfullscreenchange";
		}
		if (vendorFullscreenChange) {
			document.addEventListener(vendorFullscreenChange, function() {
				FullScreen.trigger(FullScreen.Events.FULL_SCREEN_CHANGE, {
					type: FullScreen.Events.FULL_SCREEN_CHANGE,
					data: FullScreen.isFullScreen()
				});
			}, false);
		}
		return FullScreen;
	})(document);
	/* global Util, _*/
	var Playlist = function(options) {
		this.options = options || {};
		this.initialize.apply(this, arguments);
	};
	Playlist.Events = {
		INDEX_CHANGE: "playlist:index",
		READY: "playlist:ready",
		ITEM_READY: "playlist:item:ready"
	};
	Playlist.prototype = _.extend({
		initialize: function() {
			if (this.options.metadata) {
				this.metadata = this.options.metadata;
				this.currentItem = this.getCurrentItem();
			}
		},
		currentIndex: 0,
		currentItem: null,
		getPrevious: function() {
			return this.metadata.items[this.hasPrevious() ? this.currentIndex - 1 : this.currentIndex];
		},
		getNext: function() {
			var items = this.metadata.items;
			return this.hasNext() ? items[this.currentIndex + 1] : items[this.currentIndex];
		},
		previous: function() {
			return this.setIndex(this.currentIndex - 1);
		},
		next: function() {
			return this.setIndex(this.currentIndex + 1);
		},
		hasNext: function() {
			return this.currentIndex < this.metadata.items.length - 1;
		},
		hasPrevious: function() {
			return this.currentIndex > 0;
		},
		getCurrentItem: function() {
			return this.metadata.items[this.currentIndex];
		},
		setIndex: function(index) {
			if (index > this.metadata.items.length - 1) {
				return false;
			} else if (index !== this.currentIndex) {
				this.currentIndex = index;
				this.updateCurrent();
				this.onIndexChange();
				return true;
			} else {
				return false;
			}
		},
		onIndexChange: function() {
			this.trigger(Playlist.Events.INDEX_CHANGE, {
				type: Playlist.Events.INDEX_CHANGE,
				data: this.currentIndex
			});
		},
		getItemAt: function(index) {
			var items = this.metadata.items;
			if (index < 0 || index > items.length - 1) {
				throw new Error("Playlist index " + index + " is out of range [0-" + items.length + "]");
			}
			return items[index];
		},
		updateCurrent: function() {
			this.currentItem = this.metadata.items[this.currentIndex];
		}
	}, Util.Events);
	Playlist.extend = Util.extend;
	Util.Playlist = Playlist;
	return Util;
})(_, $, Backbone, Handlebars);