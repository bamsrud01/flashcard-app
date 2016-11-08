angular.module('flashcardApp')
  .controller('CardsController', CardsController);

function CardsController(CardsService, NavService) {
  var cards = this;

  //  Information from NavService.  Included are the active username and set ID
  cards.username = NavService.userData.username;
  cards.set = NavService.set;

  //  This value will change according to what kind of service is being used.
  cards.methodType = '';

  //  Get all card information belonging to the currently active set
  cards.getCards = function() {
    CardsService.getCards(cards.set.id).then(function(response) {
      console.log('Cards in this set:', response);
      //  Returns an array of objects {id, a_image, answer, q_image, question, set_id}
      cards.cardArray = response;
      //  Determine if user can edit
      if (cards.username == cards.set.username) {
        cards.canEdit = true;
      } else {
        cards.canEdit = false;
      }
    });
  };

  //  Activate card information on click
  cards.viewCard = function(card) {
    cards.commentCheck(card);
    cards.showComments(card);
  }

  //  Function to check if user has written a comment on this card, and redirect accordingly
  cards.commentCheck = function(cardData) {
    CardsService.getMyComments(cardData.id, cards.username).then(function(response) {
      if (response.length < 1) {
        //  User has not commented
      } else {
        //  User has commented
        cards.cardComment = response[0];
      }
    });
  }

  //  Function to show all comments for this card_id
  cards.showComments = function(cardData) {
    CardsService.showComments(cardData.id).then(function(response) {
      //  response should be an array of card comment objects {id, username, card_id, comment}
    })
  }
  //  Call the function to get cards
  cards.getCards();

}
