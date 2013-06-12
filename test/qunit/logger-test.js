/*global MTVNPlayer, test, expect, ok*/
test("logger test", function() {
	var methods = ["debug", "log", "info", "error", "warn"],
		logger = new(MTVNPlayer.require("mtvn-util").Logger)(),
		_ = MTVNPlayer.require("_");
	expect(methods.length);
	try {
		_.each(methods, function(method) {
			logger[method]("testing logger method:" + method);
			ok(true, method + " worked");
		});
	} catch (e) {}
});