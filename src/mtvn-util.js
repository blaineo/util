/*global Handlebars */
(function(context) {
    var MTVNPlayer = context.MTVNPlayer = context.MTVNPlayer || {},
        // no noConflict method for these guys.
        previousHandlebars = context.Handlebars,
        Util = {},
        _ = MTVNPlayer.require("_");
    if(!context._){
        context._ = _;
    }
    // BEGIN THIRD PARTY CODE
    //= ../components/handlebars/handlebars.js
    //= ../components/backbone/backbone.js
    // END THIRD PARTY CODE
    // Handlebars has some weird scoping issues in 1.0.rc.1.
    MTVNPlayer.provide("Handlebars", Handlebars);
    MTVNPlayer.provide("Backbone", context.Backbone);
    //= form-factor.js
    //= template-processor.js
    MTVNPlayer.provide("mtvn-util", Util);
    context.Handlebars = previousHandlebars;
    context.Backbone.noConflict();
})(this);