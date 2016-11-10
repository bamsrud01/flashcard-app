angular.module('flashcardApp')
  .service('MySetsService', MySetsService);

function MySetsService($http) {
  var service = this;
  
  //  GET all card sets
  service.getCardSets = function(myUsername) {
    return $http.get('/flashcards/all-sets/mine', {
      params: {
        username: myUsername
      }
    }).then(function(response) {
      return response.data;
    });
  }

  //  GET card sets by rating
  service.getSetsByRating = function(myUsername) {
    return $http.get('/flashcards/rating/mine', {
      params: {
        username: myUsername
      }
    }).then(function(response) {
      return response.data;
    });
  }

  //  GET card sets by Favorite
  service.getSetsByFavorite = function(myUsername) {
    return $http.get('/flashcards/favorite/mine', {
      params: {
        username: myUsername
      }
    }).then(function(response) {
      return response.data;
    });
  }


  //  GET card sets by category
  service.getSetsByCategory = function(myUsername, categoryToFind) {
    console.log('Service received request for category:', categoryToFind);
    return $http.get('/flashcards/category/mine', {
      params: {
        username: myUsername,
        category: categoryToFind
      }
    }).then(function(response) {
      return response.data;
    });
  }

  //  Show set comments
  service.showComments = function(setId) {
    return $http.get('/comment/set', {
      params: {
        id: setId
      }
    }).then(function(response) {
      return response.data;
    })
  }

}
