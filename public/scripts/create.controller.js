angular.module('flashcardApp')
  .controller('CreateController', CreateController);

function CreateController(CreateService, NavService) {
  var create = this;

  create.username = NavService.userData.username;

}
