requirejs.config({
    paths: {
        jquery: '/lib/jquery/dist/jquery.min',
        bootstrap: '/lib/bootstrap/dist/js/bootstrap.min',
        common: '/scripts/common'
    },
    shim: {
        'bootstrap': {
            deps: ["jquery"]
        }
    }
});
