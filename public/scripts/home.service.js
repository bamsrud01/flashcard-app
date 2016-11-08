angular.module('flashcardApp')
  .service('HomeService', HomeService);

function HomeService($http, $location) {
  var service = this;

  //  GET all card sets
  service.getCardSets = function() {
    return $http.get('/flashcards/all-sets').then(function(response) {
      return response.data;
    });
  }

  //  GET card sets by rating
  service.getSetsByRating = function() {
    return $http.get('/flashcards/rating').then(function(response) {
      return response.data;
    });
  }

  //  GET card sets by Favorite
  service.getSetsByFavorite = function(sentUsername) {
    return $http.get('/flashcards/favorite', {
      params: {
        username: sentUsername
      }
    }).then(function(response) {
      return response.data;
    });
  }


  //  GET card sets by category
  service.getSetsByCategory = function(categoryToFind) {
    console.log('Service received request for category:', categoryToFind);
    return $http.get('/flashcards/category', {
      params: {
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
    });
  }

  //  View cards
  service.viewCards = function () {
    $location.path('/cards');
  }

}
