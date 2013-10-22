/*global MTVNPlayer, test, equal, ok*/
test("playlist test", function() {
	var Playlist = MTVNPlayer.require("mtvn-util").Playlist;
	var playlist = new Playlist({
		metadata: {
			items: [{
					name: "item1"
				}, {
					name: "item2"
				}
			]
		}
	});
	var onIndexChangedCalled = false;
	playlist.once(Playlist.Events.INDEX_CHANGE, function(event) {
		onIndexChangedCalled = true;
		equal(event.data, 1, "index updated to 1");
	});
	equal(playlist.currentItem.name, "item1", "currentItem default is 0");
	ok(playlist.hasNext(), "playlist has another item");
	equal(playlist.getPrevious().name, "item1", "get previous returns item1");
	equal(playlist.getNext().name, "item2", "get next returns item2");
	playlist.next();
	ok(onIndexChangedCalled, "event fired");
	equal(playlist.getPrevious().name, "item1", "get previous returns item1");
	equal(playlist.getNext().name, "item2", "get next returns item2");
	equal(playlist.currentItem.name, "item2", "currentItem default is 0");
	ok(!playlist.hasNext(), "playlist has no other items");
	ok(playlist.hasPrevious(), "playlist has previous items");
	onIndexChangedCalled = false;
	playlist.once(Playlist.Events.INDEX_CHANGE, function(event) {
		onIndexChangedCalled = true;
		equal(event.data, 0, "index updated to 0");
	});
	playlist.previous();
	ok(onIndexChangedCalled, "event fired");
});