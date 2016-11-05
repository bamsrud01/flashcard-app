angular.module('flashcardApp')
  .controller('CreateController', CreateController);

function CreateController(CreateService, NavService) {
  var create = this;

  create.username = NavService.userData.username;
  create.categories = NavService.categories;
  create.showNewSet = true;
  //  Sets need: {category, description, set_name, username} receive: {id, avg-rating}
  create.newSet = {};

  create.createSet = function() {
    create.newSet.username = create.username;
    CreateService.createSet(create.newSet).then(function(){});
  }

  //  Cards need: {question, answer, set_id, q-image, a-image} receive: {id}

}
