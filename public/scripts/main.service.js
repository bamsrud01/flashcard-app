angular.module('flashcardApp')
  .service('MainService', MainService);

function MainService($http, $location, $q) {
  var service = this;

  //  Handle user login
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

  //  Handle user deletion
  service.deleteUser = function(username) {
    return $http.delete('/register', {
      params: {
        username: username
      }
    }).then(function() {
      console.log('Service confirms user deletion');
      return $location.path('/home');
    });
  }

  //  Handle user logout
  service.logOutUser = function() {
    return $http.post('/register/logout').then(function() {
      return $location.path('/home');
    });
  }
}
