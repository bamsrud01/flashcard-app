angular.module('flashcardApp')
  .controller('CardsController', CardsController);

function CardsController(CardsService, NavService) {
  var cards = this;

  cards.username = NavService.userData.username;
  cards.setId = NavService.set.id;

  cards.getCards = function() {
    CardsService.getCards(cards.setId).then(function(response) {
      console.log('Cards in this set:', response);
    });
  }

  cards.getCards();

}
