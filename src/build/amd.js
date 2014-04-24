(function(root, factory) {
	/* global exports, module, define, require*/
	if (typeof exports === "object") {
		module.exports = factory(require("underscore"), require("jquery"), require("backbone"), require("handlebars"));
	} else if (typeof define === "function" && define.amd) {
		define(["underscore", "jquery", "backbone", "handlebars"], factory);
	}
}(this, function(_, $, Backbone, Handlebars) {
	//= ../start.js
	/* jshint unused:false */
	/* global Util */
	//= ../util.js
	return Util;
}));