angular.module('flashcardApp', ['ngRoute', 'mwl.calendar', 'ui.bootstrap', 'ngFileUpload'])
  .controller('MainController', MainController);

//  This controller is a parent of the other controllers
function MainController(NavService, MainService) {
  var main = this;

  main.nav = NavService;
  main.loginFail = false;

  main.login = {};

  main.logInUser = function() {
    MainService.logInUser(main.login.username, main.login.password)
    .then(function() {
      main.nav.userData.username = main.login.username;
      main.nav.state.loggedIn = true;
      main.login = {};
    }).catch(function(error) {
      main.nav.state.loggedIn = false;
    }).then(function(){
      if (!main.nav.userData.username) {
        main.loginFail = true;
      }
    });
  }

  main.deleteUser = function() {
    var userToDelete = main.nav.userData.username;
    var confirmDelete = confirm('Are you sure you want to delete your account?');
    if(confirmDelete) {
      main.logOutUser();
      console.log('Deleted user, logging out.');
      MainService.deleteUser(userToDelete).then(function() {
        console.log('Deleted user:', userToDelete);
      });
    }
  }

  main.logOutUser = function() {
    main.loginFail = false;
    MainService.logOutUser().then(function() {
      main.nav.userData.username = false;
      main.nav.state.loggedIn = false;
      console.log('Logout successful');
    }).catch(function(error) {
      console.log('Logout unsuccessful:', error);
    });
  }
}
