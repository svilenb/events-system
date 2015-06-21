requirejs(['./config'], function() {
    requirejs(['common', 'jquery', 'bootstrap'], function(common, $) {
        common.attacheEvents();
        $('#home').tab('show');
    });
});
