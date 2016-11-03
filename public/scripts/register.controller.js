angular.module('flashcardApp')
  .controller('RegisterController', RegisterController);

function RegisterController(RegisterService, NavService) {
  var register = this;

  //  These values control the messages to the user when creating an account.
  register.userData = {
    existingUsername: false,
    validEmail: false,
    successful: false
  }
  // register.existingUsername = false;
  // register.validEmail = false;
  // register.successful = false;

  //  Function checks if the user enters a valid email.
  register.validateEmail = function() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(register.newEmail)) {
      console.log('Email is valid');
      register.userData.validEmail = true;
    } else {
      console.log('Email is NOT valid.');
      register.userData.validEmail = false;
    }
  };

  //  Function checks to see if this username already exists.
  register.checkUsername = function() {
    console.log('Sending username:', register.newUsername);
    RegisterService.checkUsername(register.newUsername).then(function(result) {
      if (result.length == 0) {
        register.userData.existingUsername = false;
      } else {
        register.userData.existingUsername = true;
      }
    });
  };

  //  Function to check all account requirements
  register.requirements = function() {
    if (!register.userData.existingUsername &&
      register.userData.validEmail &&
      (register.newPassword == register.confirmPassword)
      && register.newPassword.length >= 8) {
      console.log('Requirements have been met!');
      register.user = {};
      register.user.username = register.newUsername;
      register.user.email = register.newEmail;
      register.user.password = register.newPassword;
      register.registerUser();
      NavService.state.loggedIn = true;
      // MainController.changeLoggedState(true);
      // MainController.setUsername(register.newUsername);
    } else {
      console.log('Requirements have NOT been met.');
    }
  };

  //  Send registration info to database
  register.registerUser = function() {
    RegisterService.register(register.user);
    register.userData.successful = true;
    register.user = {};
  }
}
