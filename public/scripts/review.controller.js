angular.module('flashcardApp')
  .controller('ReviewController', ReviewController);

function ReviewController(ReviewService, NavService, moment) {
  var review = this;

  //  Imported values from NavService
  review.set = NavService.set;
  review.username = NavService.userData.username;


  //  Needs: {username, set_id, date_used, correct, total, proficiency, review_date, favorited} receives {id}
  review.userHistory = {};

  //  Sets starting values for the review process, and gets the cards
  review.setUp = function() {
    //  This object will hold data for the user_data table
    review.reviewData = {
      username: review.username,
      setId: review.set.id,
      favorited: false  //  Implement this ability later
    };
    //  Initiate starting values
    review.correct = 0;
    review.incorrect = 0;
    review.total = 0;
    review.cards = [];
    review.complete = false;
    review.question = true;
    review.reviewData.dateUsed = new Date().toDateString();  //  Wed Nov 09 2016 with .toDateString()
    review.getCards();
    review.getUserData();
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

  //  Get user data
  review.getUserData = function() {
    var searchParams = {
      username: review.username,
      setId: review.set.id
    };
    ReviewService.getUserData(searchParams).then(function(response) {
      console.log('Data response:', response);
      if (response.length < 1) {
        review.userHistory.proficiency = 0;
        review.lastDate = 'No previous date'
      }
      else {
        review.userHistory = response[0];
        review.lastDate = new Date(review.userHistory.date_used).toDateString();
      }
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
      review.scheduleNext();
    }
    review.question = true;
  }

  //  Function to run if answer is correct
  review.correctAnswer = function() {
    review.total++;
    review.correct++;
    review.drawCard();
  }

  //  Function to run if answer is incorrect
  review.incorrectAnswer = function() {
    review.total++;
    review.incorrect++;
    review.drawCard();
  }

  //  Function takes the proficiency and the percentage, and determined the next scheduled date.
  review.scheduleNext = function() {
    //  Only run this code if the user is logged in.
    if (review.username != false) {
      //  Determine user proficiency by percent correct
      review.reviewData.proficiency = review.userHistory.proficiency;
      if (review.percentCorrect < 50) {
        review.reviewData.proficiency -= 1;
      } else if (review.percentCorrect >= 80) {
        review.reviewData.proficiency += 1;
      }
      //  Make sure all values remain between 0 and 5
      if (review.reviewData.proficiency < 0) {
        review.reviewData.proficiency = 0;
      }
      if (review.reviewData.proficiency > 5) {
        review.reviewData.proficiency = 5;
      }
      //  Determine the increment
      switch (review.reviewData.proficiency) {
        case 0:
          review.numDays = 1;
          break;
        case 1:
          review.numDays = 2;
          break;
        case 2:
          review.numDays = 4;
          break;
        case 3:
          review.numDays = 7;
          break;
        case 4:
          review.numDays = 14;
          break;
        case 5:
          review.numDays = 30;
          break;
      }
      review.reviewData.reviewDate = moment(review.reviewData.dateUsed)
        .add(review.numDays, 'days').toDate().toDateString();
      console.log('Proficiency:', review.reviewData.proficiency);
      console.log('Number of days:', review.numDays);
      console.log('Today\'s review:', review.reviewData.dateUsed);
      console.log('Next review:', review.reviewData.reviewDate);
      console.log('Packed object:', review.reviewData);
      review.sendUserData(review.reviewData);
    }
  }

  review.sendUserData = function(sentData) {
    ReviewService.sendUserData(sentData).then(function(response) {
      console.log('Posted response:', response);
    })
  }

  review.setUp();
  // review.drawCard();
  // console.log('Active card:', review.active);

}

//  Function to shuffle an array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
