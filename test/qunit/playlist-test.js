(function(MTVNPlayerModel, QUnit, $) {
    var mrss1 = {
        uri: "mgid:cms:test:comedycentral.com:404644",
        expect: {
            items: [{
                guid: "mgid:cms:test:comedycentral.com:404448",
                description: "Boys literally get drunk off their asses, and Stephen battles with Richard Branson."
            }]
        }
    },
        mrssUrl = "http://shadow.comedycentral.com/feeds/video_player/mrss/?uri={mgid}";

    function test(mg) {
        QUnit.asyncTest("Playlist", function() {
            var url = mrssUrl.replace("{mgid}", mg.uri),
                playlist = new(MTVNPlayerModel.Playlist)({
                    feed: url,
                    mediaGensToLoad: "all"
                });
            playlist.on("ready", function(playlist) {
                QUnit.ok(playlist, "playlist loaded");
                QUnit.ok(playlist.getCurrentItem(), "has item");
                QUnit.ok(playlist.hasNext(), "has next");
                QUnit.start();
            });
        });
    }
    test(mrss1);
})(window.MTVNPlayer.PlaylistMetadata, window.QUnit, window.ender);