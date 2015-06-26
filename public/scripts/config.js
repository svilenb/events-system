requirejs.config({
    paths: {
        jquery: '/lib/jquery/dist/jquery.min',
        bootstrap: '/lib/bootstrap/dist/js/bootstrap.min',
        common: '/scripts/common',
        knockout: '/lib/knockout/dist/knockout'
    },
    shim: {
        'bootstrap': {
            deps: ["jquery"]
        }
    }
});
