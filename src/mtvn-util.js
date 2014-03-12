/*global _, $*/
var Util = {
	version: "@@version",
	build: "@@timestamp"
};
// BEGIN THIRD PARTY CODE
//= ../components/handlebars/handlebars.runtime.js
// jshint ignore:start
Util.Handlebars = Handlebars;
// jshint ignore:end
// change "this" to a custom scope that has _ and $.
var Backbone = Util.Backbone = (function() {
	//= ../components/backbone/backbone.js
	Backbone = this.Backbone;
	Backbone.$ = this.$;
	return Backbone;
}).apply({
	_: _,
	$: $
});
// END THIRD PARTY CODE
// mtvn specific util code below...
//= logger.js
Util.extend = Backbone.Model.extend;
Util.Events = Backbone.Events;
//= module.js
//= template-processor.js
//= fullscreen.js
//= playlist.js