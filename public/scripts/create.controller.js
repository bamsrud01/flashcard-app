angular.module('flashcardApp')
  .controller('CreateController', CreateController);

function CreateController(CreateService, NavService) {
  var create = this;

  create.username = NavService.userData.username;
  create.categories = NavService.categories;
  create.cards = [];
  create.showNewSet = true;
  //  Sets need: {category, description, set_name, username} receive: {id, avg-rating}
  create.newSet = {};
  create.newCard = {
    queImage: 'none',
    ansImage: 'none'
  };

  create.comment = false;

  create.createSet = function() {
    create.newSet.username = create.username;
    CreateService.createSet(create.newSet).then(function(response){
      //  Returns array of objects {avg_rating, category, description, id, set_name, username}
      create.currentId = response[0].id;
      create.showNewSet = false;
    });
  }

  //  Cards need: {question, answer, set_id, q_image, a_image} receive: {id}
  create.addCard = function() {
    create.newCard.Id = create.currentId;
    CreateService.addCard(create.newCard).then(function(response) {
      console.log('POST card received:', response);
      //  Returns array of objects {id, question, answer, set_id, q_image, a_image}
      if (create.comment) {
        create.addComment(response[0].id, create.cardComment, create.username);
        create.comment = false;
        create.cardComment = '';
      }
      create.cards.push(response);
      console.log('Cards array:', create.cards);
      create.newCard = {
        queImage: 'none',
        ansImage: 'none'
      };
    });
  }

  create.addComment = function(Id, comment, username) {
    CreateService.addComment(Id, comment, username).then(function(response) {
      console.log('Comment response:', response);
    });
  }
}
