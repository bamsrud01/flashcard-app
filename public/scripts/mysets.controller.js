angular.module('flashcardApp')
  .controller('MySetsController', MySetsController);

function MySetsController(MySetsService, NavService) {
  var mine = this;

  mine.username = NavService.userData.username;
}
