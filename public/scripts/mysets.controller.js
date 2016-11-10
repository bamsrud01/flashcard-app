angular.module('flashcardApp')
  .controller('MySetsController', MySetsController);

function MySetsController(MySetsService, NavService) {
  var mine = this;

  mine.username = NavService.userData.username;
  mine.categories = NavService.categories;

  mine.displayMySets = function() {
    mine.getCardSets();
  }

  mine.getCardSets = function() {
    MySetsService.getCardSets(mine.username).then(function(sets) {
      console.log('Getting card sets:', sets);
      //  Returns array of objects {avg_rating, category, description, id, set_name, username}
      mine.sets = sets;
    });
  }

  mine.getSetsByRating = function() {
    MySetsService.getSetsByRating(mine.username).then(function(sets) {
      console.log('Getting card sets by rating:', sets);
      //  Returns array of objects {avg_rating, category, description, id, set_name, username}
      mine.sets = sets;
    });
  }

  mine.getSetsByFavorite = function() {
    MySetsService.getSetsByFavorite(mine.username).then(function(sets) {
      console.log('Favorited sets:', sets);
      //  MUST TEST THIS
      home.sets = sets;
    });
  }

  mine.getSetsByCategory = function(category) {
    MySetsService.getSetsByCategory(mine.username, category).then(function(sets) {
      console.log('Category results:', sets);
      //  Returns array of objects {avg_rating, category, description, id, set_name, username}
      mine.sets = sets;
    });
  }

  mine.showComments = function(set) {
    // MySetsService.set.id = setId;
    NavService.set = set;
    mine.currentSelected = set.id;
    MySetsService.showComments(set.id).then(function(comments) {
      console.log('Returned comments:', comments);
      //  Returns array of objects {comment, id, rating, set_id, username}
      mine.setComments = comments;
    })
  }

  mine.displayMySets();
}
