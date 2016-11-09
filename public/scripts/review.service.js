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

}
