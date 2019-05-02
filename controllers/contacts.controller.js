(function () {

    var app = angular.module("ContactsApp");
    app.controller("ContactsCtrl", contactsOperations);

    function contactsOperations(ConfigService, DataService) {

        this.editMode = false;
        var self = this;

        this.selectContact = function (index) {
            this.selectedElement = this.contacts[index];
            this.selectedIndex = index;
            clearMessage();
        };

        this.getHeader = function () {
            return ConfigService.name;
        };

        this.toggleEditMode = function () {
            this.editMode = !this.editMode;
            clearMessage();
        };

        DataService.getContacts().then(function (data) {
            self.contacts = data;
            self.selectedElement = self.contacts[0];
        });

        this.saveContact = function () {
            this.toggleEditMode();
            DataService.saveContact(this.selectedElement).then(function () {
                self.successMessage = 'Data successfully updated';
            }, function () {
                self.dangerMessage = 'There was an error. Please try again';
            });
        };

        function clearMessage() {
            self.successMessage = undefined;
            self.dangerMessage = undefined;
        }
    }
})();