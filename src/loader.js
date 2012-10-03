// TODO make this instantiatable? or just use it as a mix-in?
Util.Loader = function() {
    // defeault request object.
    var req = {
        // TODO , this is a test url, it converts xml2json.
        // waiting on the real service to be completed.
        baseURL: "http://localhost:3100/?url=",
        type: "jsonp",
        method: "get",
        error: function(err) {
            console.log("err", err);
        }
    };
    // mix-in the events
    return _.extend({}, Util.Events, {
        fetch: function(url, options) {
            var request = _.extend(_.clone(req), options);
            request.url = request.baseURL + escape(url);
            // hmm I guess you'd expect this to be bound for you?
            request.success = _.bind(function(data) {
                this.trigger("data", data);
            }, this);
            $.ajax(request);
        }
    });
}();