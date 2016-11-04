angular.module('flashcardApp')
  .controller('ReviewController', ReviewController);

function ReviewController(ReviewService, NavService) {
  var review = this;

  review.set_id = NavService.set.id;

  review.username = NavService.userData.username;

}
