angular.module('flashcardApp')
  .service('RegisterService', RegisterService);

function RegisterService($http, $location) {
  var service = this;

  //  Function to check for existing usernames in database
  service.checkUsername = function(usernameToCheck) {
    return $http.get('/register/check', {
      params: {
        username: usernameToCheck
      }
    }).then(function(response) {
      return response.data;
    });
  }

  //  Function to register a user
  service.register = function(user) {
    console.log('Service function');
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then(function() {
      $location.path('/home');
    }, function(error) {
      console.log('Error registering:', error);
    });
  };

}
