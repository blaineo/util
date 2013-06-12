/* global Util, Logger*/
/* exported Module */
var Module = function(options) {
	this.options = options || {};
	this.logger = new Logger(options.loggerName || this.name || this.moduleId || "Logger");
	this.initialize.apply(this, arguments);
};
Module.prototype = {
	initialize: function() {},
	destroy: function() {}
};
Module.extend = Util.extend;
Util.Module = Module;