angular.module('flashcardApp', ['ngRoute'])
  .controller('MainController', MainController);

function MainController($http) {
  var main = this;

  main.loggedIn = false;
}
