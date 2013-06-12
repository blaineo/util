/* global _, MTVNPlayer, Util */
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

	if (!MTVNPlayer.debug) {
		MTVNPlayer.debug = [];
	}

	function Logger(name) {
		this.prefix = name || "Logger";
		_.bindAll(this); // so loggers can be event handlers.
	}

	function doLog(level, logger, args) {
		var loggers = MTVNPlayer.debug.toString().toLowerCase();
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
	return Logger;
})();
Util.Logger = Logger;