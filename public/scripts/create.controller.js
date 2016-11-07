angular.module('flashcardApp')
  .controller('CreateController', CreateController);

function CreateController(CreateService, NavService) {
  var create = this;

  create.username = NavService.userData.username;
  create.categories = NavService.categories;
  create.cards = [];
  create.showNewSet = true;
  create.edit = false;
  //  Sets need: {category, description, set_name, username} receive: {id, avg-rating}
  create.newSet = {};
  create.activeCard = {
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
    create.activeCard.Id = create.currentId;
    CreateService.addCard(create.activeCard).then(function(response) {
      console.log('POST card received:', response);
      //  Returns array of objects {id, question, answer, set_id, q_image, a_image}
      if (create.comment) {
        create.addComment(response[0].id, create.cardComment, create.username);
        create.comment = false;

      }
      create.cards.push(response[0]);
      console.log('Cards array:', create.cards);
      create.activeCard = {
        queImage: 'none',
        ansImage: 'none'
      };
      create.cardComment = '';
    });
  }

  create.addComment = function(Id, comment, username) {
    CreateService.addComment(Id, comment, username).then(function(response) {
      console.log('Comment response:', response);
    });
  }

  create.editCard = function(card, index) {
    card.username = create.username;
    create.edit = true;
    create.editIndex = index;
    console.log('Card:', card, 'Index:', index);
    create.activeCard = card;
    console.log('Active card:', create.activeCard);
    CreateService.getComment(card).then(function(response) {
      console.log('Comment returned:', response[0]);
      if (response.length != 0) {
        create.commentId = response[0].id;
        create.cardComment = response[0].comment;
      }

    });
  }

  create.updateCard = function() {
    CreateService.updateCard(create.activeCard).then(function(response) {
      create.edit = false;
      console.log('Edit response:', response)
      create.cards[create.index] = response;
      console.log('Cards array after edit:', create.cards);
      console.log('Length of array:', create.cards.length);
      if (create.comment) {
        CreateService.updateComment(create.cardComment, create.commentId);
        create.comment = false;
      }
    });
  }
}
