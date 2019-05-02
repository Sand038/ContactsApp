(function () {

    var app = angular.module("ContactsApp");
    app.controller("ContactsCtrl", contactsOperations);

    function contactsOperations(ConfigService, DataService) {

        this.editMode = false;
        var self = this;

        this.selectContact = function (index) {
            this.selectedElement = this.contacts[index];
        }

        this.getHeader = function () {
            return ConfigService.name;
        }

        this.toggleEditMode = function () {
            this.editMode = !this.editMode;
        }

        DataService.getContacts().then(function (data) {
            self.contacts = data;
            self.selectedElement = self.contacts[0];
        });

        this.saveContact = function () {
            this.toggleEditMode();
            DataService.saveContact(this.selectedElement);
        }
    }
})();