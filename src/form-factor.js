/*globals Util _ */
Util.getFormFactorMap = function(formFactorID) {
    var ffMap = {};
    // split into individual form factors.
    _((formFactorID).split(".")).each(function(item) {
        item = item.split(":");
        // a hash of each form factor id and its value e.g. {0:1.21:0,1,2}.
        ffMap[item[0]] = item[1].split(",");
    });
    return ffMap;
};
/**
 * Utily function used externally.
 */
Util.getFormFactorValuesForId = function(formFactorID, id) {
    if(!_.isString(formFactorID)){
        throw new Error("mtvn-util: formFactorID must be string");
    }
    var ffMap = Util.getFormFactorMap(formFactorID);
    return _.isArray(ffMap[id]) ? ffMap[id] : [];
};
Util.mapFormFactorID = function(formFactorID, inputMap, copyTo) {
    var ffMap = Util.getFormFactorMap(formFactorID);
    // create an object if we're not augmenting one.
    copyTo = copyTo || {};
    // take the input map and for each item reference the form factor object
    _(inputMap).each(function(item, key) {
        if (_(ffMap).has(key)) {
            // if there's more than one value for a form factor index, map them...
            copyTo[item.name] = ffMap[key].length > 1 ? _(ffMap[key]).map(function(value) {
                return item.value[value];
            }) : item.value[ffMap[key]];
        } else {
            // use the default, which is the 0 value, unless defaultValue is defined.
            copyTo[item.name] = _.isUndefined(item.defaultValue) ? item.value[0] : item.defaultValue;
        }
    });
    return copyTo;
};