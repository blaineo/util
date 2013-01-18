/*globals Util $ */
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