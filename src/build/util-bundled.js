/* global _, $ */
var Util = (function(_, $) {
	/**
	 * Legacy support.
	 * This build comes with Backbone and Handlebars.
	 */
	//= ../start.js
	// BEGIN THIRD PARTY CODE
	/* global Handlebars */
	//= ../../components/handlebars/handlebars.runtime.js
	// jshint ignore:start
	Util.Handlebars = Handlebars;
	// jshint ignore:end
	// change "this" to a custom scope that has _ and $.
	var Backbone = Util.Backbone = (function() {
		//= ../../components/backbone/backbone.js
		Backbone = this.Backbone;
		Backbone.$ = this.$;
		return Backbone;
	}).apply({
		_: _,
		$: $
	});
	// END THIRD PARTY CODE
	//= ../util.js
	return Util;
})(_, $);