angular.module('flashcardApp', ['ngRoute'])
  .controller('MainController', MainController);

//  This controller is a parent of the other controllers
function MainController(NavService) {
  var main = this;

  main.status = NavService;

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
