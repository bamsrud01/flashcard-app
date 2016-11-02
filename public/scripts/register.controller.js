angular.module('flashcardApp')
  .controller('RegisterController', RegisterController);

function RegisterController(RegisterService) {
  var register = this;

  //  These values control the messages to the user when creating an account.
  register.existingUsername = false;
  register.validEmail = false;

  //  Function checks if the user enters a valid email.
  register.validateEmail = function() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(register.newEmail)) {
      console.log('Email is valid');
      register.validEmail = true;
    } else {
      console.log('Email is NOT valid.');
      register.validEmail = false;
    }
  };

  //  Function checks to see if this username already exists.
  register.checkUsername = function() {
    console.log('Sending username:', register.newUsername);
    RegisterService.checkUsername(register.newUsername).then(function(result) {
      if (result.length == 0) {
        register.existingUsername = false;
      } else {
        register.existingUsername = true;
      }
    });
  };

  //  Function to check all account requirements
  register.requirements = function() {
    if (!register.existingUsername && register.validEmail && (register.newPassword == register.confirmPassword) && register.newPassword.length >= 8) {
      console.log('Requirements have been met!');
      register.registerUser();
    } else {
      console.log('Requirements have NOT been met.');
    }
  };

  register.registerUser = function() {

  }
}
