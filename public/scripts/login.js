requirejs(['./config'], function() {
    requirejs(['common', 'jquery', 'bootstrap'], function(common, $) {
        common.attacheEvents();
        $('#login').tab('show');
    });
});
