/* global Util, _*/
var Playlist = function(options) {
    this.options = options || {};
    this.initialize.apply(this, arguments);
};
Playlist.Events = {
    INDEX_CHANGE: "playlist:index",
    READY:"playlist:ready",
    ITEM_READY:"playlist:item:ready"
};
Playlist.prototype = _.extend({
    initialize: function() {
        _.bindAll(this);
        if (this.options.metadata) {
            this.metadata = this.options.metadata;
            this.currentItem = this.getCurrentItem();
        }
    },
    currentIndex: 0,
    currentItem: null,
    getPrevious: function() {
        return this.metadata.items[this.hasPrevious() ? this.currentIndex - 1 : this.currentIndex];
    },
    getNext: function() {
        var items = this.metadata.items;
        return this.hasNext() ? items[this.currentIndex + 1] : items[this.currentIndex];
    },
    previous: function() {
       return this.setIndex(this.currentIndex - 1);
    },
    next: function() {
       return this.setIndex(this.currentIndex + 1);
    },
    hasNext: function() {
        return this.currentIndex < this.metadata.items.length - 1;
    },
    hasPrevious: function() {
        return this.currentIndex > 0;
    },
    getCurrentItem: function() {
        return this.metadata.items[this.currentIndex];
    },
    setIndex: function(index) {
        if (index > this.metadata.items.length - 1) {
            return false;
        } else if (index !== this.currentIndex) {
            this.currentIndex = index;
            this.updateCurrent();
            this.onIndexChange();
            return true;
        } else {
            return false;
        }
    },
    onIndexChange: function() {
        this.trigger(Playlist.Events.INDEX_CHANGE, {
            type: Playlist.Events.INDEX_CHANGE,
            data: this.currentIndex
        });
    },
    getItemAt: function(index) {
        var items = this.metadata.items;
        if (index < 0 || index > items.length - 1) {
            throw new Error("Playlist index " + index + " is out of range [0-" + items.length + "]");
        }
        return items[index];
    },
    updateCurrent: function() {
        this.currentItem = this.metadata.items[this.currentIndex];
    }
}, Util.Events);
Playlist.extend = Util.extend;
Util.Playlist = Playlist;