(function () {

    var app = angular.module("ContactsApp");

    app.service("ConfigService", function () {
        this.name = 'Contacts App';
        this.author = 'sand';
    });

})();