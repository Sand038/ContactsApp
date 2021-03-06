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

        function getContacts(){
            DataService.getContacts().then(function (data) {
                self.contacts = data;
                self.selectedElement = self.contacts[0];
                self.selectedIndex = 0;
            });
        }

        this.saveContact = function () {
            this.toggleEditMode();
            if (this.selectedIndex === -1) {
                this.selectedElement.picture = {};
                this.selectedElement.picture.large = 'https://randomuser.me/api/portraits/men/0.jpg';
                DataService.saveNewContact(this.selectedElement).then(function () {
                    self.successMessage = 'Data successfully saved';
                    getContacts();
                }, function () {
                    self.dangerMessage = 'There was an error. Please try again';
                });
            } else {
                DataService.saveContact(this.selectedElement).then(function () {
                    self.successMessage = 'Data successfully updated';
                }, function () {
                    self.dangerMessage = 'There was an error. Please try again';
                });
            }

        };

        this.addContact = function () {
            this.selectedElement = {};
            this.selectedIndex = -1;
            this.editMode = true;
        };

        this.cancel = function () {
            this.editMode = false;
            this.selectedElement = this.contacts[0];
            this.selectedIndex = 0;
        };

        function clearMessage() {
            this.successMessage = undefined;
            this.dangerMessage = undefined;
        }

        getContacts();
    }
})();