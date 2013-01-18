/*globals Util _ */
Util.extend = function(protoProps, staticProps) {
    var parent = this,
        child;

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