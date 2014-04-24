/* global test, ok, Backbone, Handlebars, Util */
test("Backbone, Handlebars, noConflict", function() {
	ok(Backbone.original, "Backbone is original");
	ok(Handlebars.original, "Handlebars is original");
	ok(Util.Backbone, "Backbone exists");
	ok(!Util.Backbone.original, "Backbone in Util is not from page");
	ok(!Util.Handlebars.original, "Handlebars in Util is not from page");
});