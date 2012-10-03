/*! mtvn-util - v0.0.1 - 2012-10-03 03:10:27
* Copyright (c) Viacom 2012 */
(function(context) {
    var MTVNPlayer = context.MTVNPlayer = context.MTVNPlayer || {};
    // dependencies are passed to the module's constructor.
    MTVNPlayer.Util = function($,_) {
        var Util = {};
        Util.Events = {
            on: function(type, callback) {
                $(this).bind(type, callback);
            },
            off: function(type, callback) {
                $(this).unbind(type, callback);
            },
            trigger: function(type, data) {
                $(this).trigger(type, data);
            }
        };
        Util.extend = function(protoProps, staticProps) {
            var parent = this;
            var child;
        
            // The constructor function for the new subclass is either defined by you
            // (the "constructor" property in your `extend` definition), or defaulted
            // by us to simply call the parent's constructor.
            if (protoProps && _.has(protoProps, 'constructor')) {
                child = protoProps.constructor;
            } else {
                child = function() {
                    parent.apply(this, arguments);
                };
            }
        
            // Set the prototype chain to inherit from `parent`, without calling
            // `parent`'s constructor function.
        
            function Surrogate() {
                this.constructor = child;
            }
            Surrogate.prototype = parent.prototype;
            child.prototype = new Surrogate();
        
            // Add prototype properties (instance properties) to the subclass,
            // if supplied.
            if (protoProps) _.extend(child.prototype, protoProps);
        
            // Add static properties to the constructor function, if supplied.
            _.extend(child, parent, staticProps);
        
            // Set a convenience property in case the parent's prototype is needed
            // later.
            child.__super__ = parent.prototype;
        
            return child;
        };
        Util.Loader = function() {
            // defeault request object.
            var req = {
                baseURL: "http://localhost:3100/?url=",
                type: "jsonp",
                method: "get",
                error: function(err) {
                    
                }
            };
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
        return Util;
    // pull out the ender dependencies and reference them later directly.
    // but leave jQuery/Zepto functionality in the $.
    }(this.$,this.$._);
})(this);