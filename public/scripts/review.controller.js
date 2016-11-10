angular.module('flashcardApp')
  .controller('ReviewController', ReviewController);

function ReviewController(ReviewService, NavService) {
  var review = this;

  review.set = NavService.set;
  review.username = NavService.userData.username;

  //  This object will hold data for the user_data table
  review.reviewData = {
    username: review.username,
    setId: review.set.id
  };
  //  Needs: {username, set_id, date_used, correct, total, proficiency, review_date, favorited} receives {id}


  //  Sets starting values for the review process, and gets the cards
  review.setUp = function() {
    review.correct = 0;
    review.incorrect = 0;
    review.total = 0;
    review.cards = [];
    review.complete = false;
    review.question = true;
    review.reviewData.dateUsed = new Date().toDateString();  //  Wed Nov 09 2016
    review.getCards();
  }

  //  Gets cards in the current set
  review.getCards = function() {
    console.log('Searching for id:', review.set.id);
    ReviewService.getCards(review.set.id).then(function(response) {
      review.cards = shuffleArray(response);
      console.log('Shuffled cards:', review.cards);
      review.drawCard();
      console.log('Active card:', review.active);
      //  Returns array of objects {id, question, answer, q_image, a_image, set_id}
    });
  }

  //  Display one card at a time
  review.drawCard = function() {
    if (review.cards.length > 0) {
      review.active = review.cards.pop();
    } else {
      review.complete = true;
      review.percentCorrect = (review.correct/review.total * 100).toFixed(2);
      review.reviewData.correct = review.correct;
      review.reviewData.total = review.total;
    }
    review.question = true;
  }

  review.correctAnswer = function() {
    review.total++;
    review.correct++;
    review.drawCard();
  }

  review.incorrectAnswer = function() {
    review.total++;
    review.incorrect++;
    review.drawCard();
  }

  review.setUp();
  // review.drawCard();
  // console.log('Active card:', review.active);

}

//  Function to shffle an array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
