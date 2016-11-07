angular.module('flashcardApp')
  .controller('CardsController', CardsController);

function CardsController(CardsService, NavService) {
  var cards = this;

  cards.username = NavService.userData.username;
  
}
