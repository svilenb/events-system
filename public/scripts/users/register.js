requirejs(['../config'], function() {
    requirejs(['common', 'jquery', 'knockout', 'bootstrap'], function(common, $, ko) {
        common.showActiveTab('#register');
        var emailRegex = /[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/;
        var usernameRegex = /([_.0-9A-Za-z]{6,20})/;

        function RegisterViewModel() {
            this.username = ko.observable('');
            this.email = ko.observable('');
            this.firstName = ko.observable('');
            this.lastName = ko.observable('');
            this.phoneNumber = ko.observable('');
            this.password = ko.observable('');
            this.confirmPassword = ko.observable('');

            this.isUsernameValid = ko.pureComputed(function () {
                return usernameRegex.test(this.username());
            }, this);

            this.isFirstNameValid = ko.pureComputed(function () {
                return this.firstName().length !== 0;
            }, this);

            this.isLastNameValid = ko.pureComputed(function () {
                return this.lastName().length !== 0;
            }, this);

            this.isEmailValid = ko.pureComputed(function() {
                return emailRegex.test(this.email());
            }, this);

            this.isPasswordValid = ko.pureComputed(function() {
                return this.password().length > 5;
            }, this);

            this.isConfirmPasswordValid = ko.pureComputed(function() {
                return this.confirmPassword().length > 5;
            }, this);
        }

        ko.applyBindings(new RegisterViewModel());
    });
});
