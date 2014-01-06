/*global MTVNPlayer, test, equal*/
test("url test", function() {
	var Url = MTVNPlayer.require("mtvn-util").Url,
		base = "http://test.com/dir/",
		u = Url.parse(base);
	u.setParameter("a", "b");
	equal(u.toString(), base + "?a=b");
	u.removeParameter("a");
	equal(u.toString(), base);
	u.setParameter("a", "b");
	u.setParameter("a", "c");
	equal(u.toString(), base + "?a=c");
	// try with file
	base = "http://test.com/file.xml";
	u = Url.parse(base);
	u.setParameter("a", "b");
	equal(u.toString(), base + "?a=b");
	u.removeParameter("a");
	equal(u.toString(), base);
	u.setParameter("a", "b");
	u.setParameter("a", "c");
	equal(u.toString(), base + "?a=c");
});