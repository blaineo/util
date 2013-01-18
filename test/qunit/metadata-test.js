(function(MTVNPlayerModel, QUnit, $) {
    var mrss1 = {
        uri: "mgid:cms:test:comedycentral.com:404644",
        expect: {
            items: [{
                guid:"mgid:cms:test:comedycentral.com:404448",
                description: "Boys literally get drunk off their asses, and Stephen battles with Richard Branson."
            }]
        }
    },
        mrssUrl = "http://shadow.comedycentral.com/feeds/video_player/mrss/?uri={mgid}";

    function test(mg) {
        QUnit.asyncTest("Metadata", function() {
            var url = mrssUrl.replace("{mgid}", mg.uri),
                Mrss = new(MTVNPlayerModel.Metadata)({
                    feed: url,
                    mediaGensToLoad:"all"
                });
            Mrss.on("ready", function(result) {
                console.log("result:",result);
                var items = result.items;
                QUnit.ok(result, "mrss ready");
                QUnit.ok(result.description === "", "test");
                QUnit.ok(items.length === 6, "number of items correct");
                QUnit.ok(items[0].rss.description === mrss1.expect.items[0].description,"description match"); 
                QUnit.ok(items[0].rss.guid === mrss1.expect.items[0].guid,"guid match"); 
                QUnit.start();
            });
        });
    }
    test(mrss1);
})(window.MTVNPlayer.PlaylistMetadata, window.QUnit, window.ender);