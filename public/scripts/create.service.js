angular.module('flashcardApp')
  .service('CreateService', CreateService);

function CreateService($http, $location) {
  var service = this;

  //  Creates a set
  service.createSet = function(setData) {
    return $http({
      method: 'POST',
      url: '/flashcards/set',
      data: setData
    }).then(function(response) {
      return response.data;
    });
  };

  //  Adds a card
  service.addCard = function(cardData) {
    return $http({
      method: 'POST',
      url: '/flashcards/card',
      data: cardData
    }).then(function(response) {
      return response.data;
    });
  }

  //  Adds a comment, associated with a specific card
  service.addComment = function(cardId, comment, username) {
    return $http({
      method: 'POST',
      url: '/comment/card',
      data: {
        username: username,
        cardId: cardId,
        comment: comment
      }
    }).then(function(response) {
      return response.data;
    });
  }

  //  Updates an existing card
  service.updateCard = function(cardData) {
    return $http({
      method: 'PUT',
      url: '/flashcards/card',
      data: cardData
    }).then(function(response) {
      return response.data;
    });
  }

  //  Gets a comment by the card id and username
  service.getComment = function(cardData) {
    return $http.get('/comment/card', {
      params: {
        id: cardData.id,
        username: cardData.username
      }
    }).then(function(response) {
      return response.data;
    });
  }

  //  Updates a comment, takes the comment id
  service.updateComment = function(comment, id) {
    var commentData = {
      comment: comment,
      id: id
    }
    return $http({
      method: 'PUT',
      url: '/comment/card',
      data: commentData
    }).then(function(response) {
      return response.data;
    });
  }

  service.completeSet = function() {
    $location.path('/cards');
  }
}
