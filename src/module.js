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