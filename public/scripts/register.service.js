angular.module('flashcardApp')
  .service('RegisterService', RegisterService);

function RegisterService($http) {
  var service = this;

  service.checkUsername = function(usernameToCheck) {
    console.log('Service handling username:', usernameToCheck);
    return $http.get('/register/check', {
      params: {
        username: usernameToCheck
      }
    }).then(function(response) {
      console.log('Response:', response.data);
      return response.data;
    });
  }

}
