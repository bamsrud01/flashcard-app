angular.module('flashcardApp', ['ngRoute'])
  .controller('MainController', MainController);

//  This controller is a parent of the other controllers
function MainController($http) {
  var main = this;

  main.loggedIn = false;

  main.changeLoggedState = function(state) {
    main.loggedIn = state;
  }

  main.setUsername = function(username) {
    main.name = username;
  }

  main.sendUsername = function(username) {
    return main.name;
  }
}
