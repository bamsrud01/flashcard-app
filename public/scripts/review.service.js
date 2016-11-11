angular.module('flashcardApp')
  .service('ReviewService', ReviewService);

function ReviewService($http) {
  var service = this;

  service.getCards = function(setId) {
    return $http.get('/flashcards/card', {
      params: {
        setId: setId
      }
    }).then(function(response) {
      return response.data;
    });
  }

  service.getUserData = function(searchParams) {
    return $http.get('/data', {
      params: {
        setId: searchParams.setId,
        username: searchParams.username
      }
    }).then(function(response) {
      return response.data;
    });
  }

  service.sendUserData = function(sentData) {
    return $http({
      method: 'POST',
      url: '/data',
      data: sentData
    }).then(function(response) {
      return response.data;
    });
  }

}
