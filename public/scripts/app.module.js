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
    console.log('Function works');
    var confirmDelete = confirm('Are you sure you want to delete your account?');
    if(confirmDelete) {
      if(main.nav.state.loggedIn) {
        console.log('Deleting user:', main.nav.userData.username);
        MainService.deleteUser(main.nav.userData.username).then(function() {
          console.log('Deleted user, logging out.');
          main.logOutUser();
        });
      }
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
