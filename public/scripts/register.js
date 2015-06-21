requirejs(['./config'], function() {
    requirejs(['common', 'jquery', 'bootstrap'], function(common, $) {
        common.attacheEvents();
        $('#register').tab('show');
    });
});
