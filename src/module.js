/* global Util, Logger, _, Backbone*/
/* exported Module */
var Module = function(options) {
	this.options = options || {};
	this.logger = new Logger(options.loggerName || this.name || this.moduleId || "Logger");
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