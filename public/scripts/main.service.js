angular.module('flashcardApp')
  .service('MainService', MainService);

function MainService($http, $location, $q) {
  var service = this;

  service.logInUser = function(logInUsername, logInPassword) {
    return $http.post('/register/login', {
      username: logInUsername,
      password: logInPassword
    }).then(function() {
      return $location.path('/home');
    }, function(error) {
      console.log('Error logging in:', error);
      return $q.reject(error);
    });
  };

  service.logOutUser = function() {
    return $http.post('register/logout');
  }
}
