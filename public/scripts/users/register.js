requirejs(['../config'], function() {
    requirejs(['common', 'jquery', 'bootstrap'], function(common, $) {
        common.showActiveTab('#register');
    });
});
