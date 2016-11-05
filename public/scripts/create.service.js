angular.module('flashcardApp')
  .service('CreateService', CreateService);

function CreateService($http) {
  var service = this;

  service.createSet = function(setData) {
    console.log('Set data received:', setData);
    return $http({
      method: 'POST',
      url: '/flashcards/set',
      data: setData
    }).then(function(response) {
      console.log('Response:', response.data);
      return response.data;
    });
  };

  service.addCard = function(cardData) {
    console.log('Card data recieved:', cardData);
    return $http({
      method: 'POST',
      url: '/flashcards/card',
      data: cardData
    }).then(function(response) {
      return response.data;
    });
  }

  service.addComment = function(cardId, comment, username) {
    console.log('Comment received:', comment);
    console.log('Card ID received:', cardId);
    return $http({
      method: 'POST',
      url: '/flashcards/comment',
      data: {
        username: username,
        cardId: cardId,
        comment: comment
      }
    }).then(function(response) {
      return response.data;
    });
  }
}
