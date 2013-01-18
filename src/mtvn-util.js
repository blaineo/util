/*globals _  Handlebars */
(function(context) {
    var MTVNPlayer = context.MTVNPlayer = context.MTVNPlayer || {};
    // BEGIN THIRD PARTY CODE
    //= ../components/underscore/underscore.js
    //= ../components/zepto/zepto.js
    //= ../components/handlebars/handlebars.js
    //= ../components/backbone/backbone.js
    // END THIRD PARTY CODE
    (function($, _, Handlebars) {
        var Util = {}, 
            require = MTVNPlayer.require,
            provide = MTVNPlayer.provide;

        provide("_", _);
        provide("$", $);
        provide("Handlebars", Handlebars);
        //= events.js
        //= class.js
        //= loader.js
        provide("util",Util);
        // pull out the ender dependencies and reference them later directly.
        // but leave jQuery/Zepto functionality in the $.
    })($, _.noConflict(), Handlebars);
})(this);