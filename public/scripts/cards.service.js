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

  //  Search for comments by active username
  service.getMyComments = function(cardId, username) {
    return $http.get('/comment/card', {
      params: {
        id: cardId,
        username: username
      }
    }).then(function(response) {
      return response.data;
    });
  }

  //  Show comments for a card
  service.showComments = function(cardId) {
    return $http.get('/comment/card-all', {
      params: {
        id: cardId
      }
    }).then(function(response) {
      return response.data;
    })
  }

}
