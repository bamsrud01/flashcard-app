angular.module('flashcardApp')
  .service('HomeService', HomeService);

function HomeService($http) {
  var service = this;

  //  GET all card sets
  service.getCardSets = function() {
    return $http.get('/flashcards/all-sets').then(function(response) {
      console.log('Service response:', response.data);
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
      console.log('Category response:', response.data);
      return response.data;
    });
  }

}
