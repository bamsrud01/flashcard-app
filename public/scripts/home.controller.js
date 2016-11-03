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
      console.log(sets);
      //  Returns array of objects {category, id, set_name, username}
    });
  }

  home.getSetsByCategory = function(category) {
    console.log('button clicked');
    HomeService.getSetsByCategory(category).then(function(sets) {
      console.log('Category results:', sets);

    });
  }

  home.displayHome();
}
