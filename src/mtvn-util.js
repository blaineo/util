(function(context) {
    /*global Handlebars _ Backbone $ */
    var MTVNPlayer = context.MTVNPlayer = context.MTVNPlayer || {},
    // no noConflict method for these guys.
    previous$ = context.$,
        previousHandlebars = context.Handlebars,
        Util = {}, _;
    // BEGIN THIRD PARTY CODE
    //= ../components/underscore/underscore.js
    //= ../components/zepto/zepto.js
    //= ../components/handlebars/handlebars.js
    //= ../components/backbone/backbone.js
    // END THIRD PARTY CODE
    _ = context._;
    MTVNPlayer.provide("_", context._);
    MTVNPlayer.provide("$", context.$);
    // Handlebars has some weird scoping issues in 1.0.rc.1.
    MTVNPlayer.provide("Handlebars", Handlebars);
    MTVNPlayer.provide("Backbone", context.Backbone);
    //= form-factor.js
    //= template-processor.js
    MTVNPlayer.provide("mtvn-util", Util);
    context.$ = previous$;
    context.Handlebars = previousHandlebars;
    context._.noConflict();
    context.Backbone.noConflict();
})(this);