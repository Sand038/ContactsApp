(function () {

    var app = angular.module("ContactsApp");

    app.service("DataService", function ($http) {

        var self = this;

        self.getContacts = function () {
            var promise1 = $http.get('http://localhost:3000/contacts');
            var promise2 = promise1.then(function (response) {
                return response.data;
            });
            return promise2;
        }

        self.saveContact = function (contact) {
            $http.put('http://localhost:3000/contacts/' + contact.id, contact).then(function (response) {
                console.log(response);
            })
        }
    });

})();