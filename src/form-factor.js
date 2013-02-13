/*global Util _ */
/**
 * @return {Object} Converts the string into a hash of form factor id and an {Array}. e.g. {0:[1],21:[0,1,2]}
 */
Util.getFormFactorMap = function(formFactorID) {
    var ffMap = {};
    // split into individual form factors.
    if(formFactorID) {
        _((formFactorID).split(".")).each(function(item) {
            item = item.split(":");
            if(item.length === 2) {
                ffMap[item[0]] = item[1].split(",");
            }
        });
    }
    return ffMap;
};
/**
 * @return {Array} The array value for the form factor id e.g. [0,1,2] or [0]
 */
Util.getFormFactorValuesForId = function(formFactorID, id) {
    var ffMap = Util.getFormFactorMap(formFactorID);
    return _.isArray(ffMap[id]) ? ffMap[id] : [];
};
/**
 * Take a hash map of input, and return a map of the form factor values mapped to those values.
 * ```javascript
 * var myMap = mapFormFactorID("6:1,2",{"6":name:"share",value:["facebook","twitter","embed"]});
 * \\ myMap.share = ["twitter","embed"];
 *
 * var myMap = mapFormFactorID("10:1",{"10":name:"fullEpisode",value:[false,true]});
 * \\ myMap.fullEpisode = true;
 *
 * var myMap = mapFormFactorID("",{"10":name:"fullEpisode",value:[false,true],defaultValue:false});
 * \\ myMap.fullEpisode = false;
 * ```
 */
Util.mapFormFactorID = function(formFactorID, inputMap, copyTo) {
    var ffMap = Util.getFormFactorMap(formFactorID);
    // create an object if we're not augmenting one.
    copyTo = copyTo || {};
    // take the input map and for each item reference the form factor object
    _(inputMap).each(function(item, key) {
        if(_(ffMap).has(key)) {
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