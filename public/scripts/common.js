define(['jquery', 'bootstrap'], function($) {
    'use strict';

    return {
        attacheEvents: function() {
            $(document).ready(function() {
                $('#myTabs li a').click(function() {
                    $(this).parent('li').tab('show');
                });
            });
        },
        showActiveTab: function (id) {
            $(id).tab('show');
        }
    };
});
