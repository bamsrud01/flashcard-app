angular.module('flashcardApp')
  .controller('ReviewController', ReviewController);

function ReviewController(ReviewService, NavService) {
  var review = this;

  review.set = NavService.set;
  review.username = NavService.userData.username;



  review.setUp = function() {
    review.correct = 0;
    review.total = 0;
    review.cards = [];
    review.date = new Date().toDateString();  //  Wed Nov 09 2016
    review.getCards();
  }

  //  Gets cards in the current set
  review.getCards = function() {
    console.log('Searching for id:', review.set.id);
    ReviewService.getCards(review.set.id).then(function(response) {
      review.cards = shuffleArray(response);
      console.log('Shuffled cards:', review.cards);
      //  Returns array of objects {id, question, answer, q_image, a_image, set_id}
    });
  }

  review.setUp();

}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
