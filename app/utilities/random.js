module.exports = {
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomNumber: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    getRandomString: function(minLength, maxLength) {
        var stringLength = this.getRandomInt(minLength, maxLength + 1);
        var text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

        return text.substr(0, stringLength);
    },
    getRandomChar: function() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_ .';

        return characters[this.getRandomInt(0, characters.length)];
    },
    getRandomDate: function(config) {
        return new Date(
            this.getRandomInt(config.minYear, config.maxYear + 1),
            this.getRandomInt(config.minMonth, config.maxMonth + 1),
            this.getRandomInt(config.minDay, config.maxDay + 1)
        );
    }
};
