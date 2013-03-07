/*global Util, Handlebars, _ */
var templatePreprocess = function(text) {
    // we need to both support {uri} and {uri.id}, there is an obvious conflict there.
    return text.replace(/\{/g, "{{").replace(/\}/g, "}}").replace(/\{uri\./, "{uriParts.");
};

/**
 * text can be a single string, an object with string properites, or an array of strings.
 */
Util.template = function(text, data, keys) {
    // parse strings like {uri}
    if (_.isString(text)) {
        return Handlebars.compile(templatePreprocess(text))(data);
    } else {
        _(text).each(function(prop, key) {
            if (!keys || _.contains(keys,key)) {
                // do an extra check to make sure there is a template, perhaps enhancing performance.
                if (_.isString(prop) && prop.indexOf("{") !== -1) {
                    text[key] = Handlebars.compile(templatePreprocess(prop))(data);
                }
            }
        });
        return text;
    }
};
/**
 * This is equivalent to the TemplateProxy in flash.
 */
Util.buildTemplateData = function(player, extraData) {
    var data = _.extend({}, player.config, extraData),
        splitUri = data.uri.split(":");
    // build uri
    data.uriParts = {
        namespace: splitUri[3],
        id: splitUri[4]
    };
    // metadata for legacy
    data.metadata = player.currentMetadata;
    data.playlistMetadata = player.playlistMetadata;
    // future tempales can just access properties on the embed api.
    data.player = player;
    // legacy this is in flash player, not sure if used.
    data.app = {
        width: data.width,
        height: data.height
    };
    return data;
};