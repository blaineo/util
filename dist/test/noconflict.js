/* global test, ok, Backbone, Handlebars, Util */
test("Backbone, Handlebars, noConflict", function() {
	ok(Backbone.original, "Backbone is original");
	ok(Handlebars.original, "Handlebars is original");
	ok(Util.Backbone, "Backbone exists");
	ok(Util.Handlebars, "Handlebars exists");
});