angular.module('flashcardApp')
  .service('CardsService', CardsService);

function CardsService($http, $location) {
  var service = this;

  //  Get all cards by ID
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
