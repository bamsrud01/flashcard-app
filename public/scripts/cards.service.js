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
    });
  }

  //  Submit a comment, either through a POST or PUT request
  service.submitCardComment = function(cardData, methodType) {
    return $http({
      method: methodType,
      url: '/comment/card',
      data: cardData
    }).then(function(response) {
      return response.data;
    });
  }

  //  Search for set comments by active username
  service.getMySetComments = function(setId, username) {
    return $http.get('/comment/set-mine', {
      params: {
        id: setId,
        username: username
      }
    }).then(function(response) {
      return response.data;
    });
  }

  //  Submit a set comment, either through a POST or PUT request
  service.submitSetComment = function(setData, methodType) {
    return $http({
      method: methodType,
      url: '/comment/set',
      data: setData
    }).then(function(response) {
      return response.data;
    });
  }

  //  Show all comments for a set
  service.showSetComments = function(setId) {
    return $http.get('/comment/set', {
      params: {
        id: setId
      }
    }).then(function(response) {
      return response.data;
    });
  }
}
