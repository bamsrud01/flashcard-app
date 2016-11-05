angular.module('flashcardApp')
  .controller('HomeController', HomeController);

function HomeController(HomeService, NavService) {
  var home = this;

  home.username = NavService.userData.username;
  home.categories = NavService.categories;

  home.displayHome = function() {
    home.getCardSets();
  }

  home.getCardSets = function() {
    HomeService.getCardSets().then(function(sets) {
      console.log('Getting card sets:', sets);
      //  Returns array of objects {avg_rating, category, description, id, set_name, username}
      home.sets = sets;
    });
  }

  home.getSetsByRating = function() {
    HomeService.getSetsByRating().then(function(sets) {
      console.log('Getting card sets by rating:', sets);
      //  Returns array of objects {avg_rating, category, description, id, set_name, username}
      home.sets = sets;
    });
  }

  home.getSetsByFavorite = function() {
    HomeService.getSetsByFavorite(home.username).then(function(sets) {
      console.log('Favorited sets:', sets);
      //  MUST TEST THIS
      home.sets = sets;
    });
  }

  home.getSetsByCategory = function(category) {
    HomeService.getSetsByCategory(category).then(function(sets) {
      console.log('Category results:', sets);
      //  Returns array of objects {avg_rating, category, description, id, set_name, username}
      home.sets = sets;
    });
  }

  home.showComments = function(setId) {
    NavService.set.id = setId;
    home.currentSelected = setId
    HomeService.showComments(setId).then(function(comments) {
      console.log('Returned comments:', comments);
      //  Returns array of objects {comment, id, rating, set_id, username}
      home.setComments = comments;
    })
  }

  home.displayHome();
}
