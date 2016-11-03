angular.module('flashcardApp')
  .controller('ReviewController', ReviewController);

function ReviewController(ReviewService, NavService) {
  var review = this;

  review.username = NavService.userData.username;

}
