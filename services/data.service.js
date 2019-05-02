(function () {

    var app = angular.module("ContactsApp");

    app.service("DataService", function ($http) {

        var self = this;

        self.getContacts = function () {
            return $http.get('http://localhost:3000/contacts').then(function (response) {
                return response.data;
            });
        };

        self.saveContact = function (contact) {
            return $http.put('http://localhost:3000/contacts/' + contact.id, contact).then(function (response) {
                console.log(response);
            });
        };

        self.saveNewContact = function (contact) {
            return $http.post('http://localhost:3000/contacts/', contact).then(function (response) {
                console.log(response);
            });
        };
    });

})();