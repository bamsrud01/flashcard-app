angular.module('flashcardApp')
  .controller('CreateController', CreateController);

/*
  There's a bug here!  Editing or viewing previously-created cards may duplicate that card in the final set.
*/


function CreateController(CreateService, NavService, Upload) {
  var create = this;

  create.username = NavService.userData.username;
  create.categories = NavService.categories;
  //  These values control whether certain functions run or not.
  create.showNewSet = true;
  create.edit = false;
  create.comment = false;
  //  Starting values for sets and cards
  create.cards = [];
  create.newSet = {};
  create.activeCard = {
    q_image: 'none',
    a_image: 'none'
  };

  //  Sets need: {category, description, set_name, username} receive: {id, avg-rating}
  //  Cards need: {question, answer, set_id, q_image, a_image} receive: {id}

  //  This function creates a new set.  All cards created will be part of this set.
  create.createSet = function() {
    create.newSet.username = create.username;
    CreateService.createSet(create.newSet).then(function(response){
      //  Returns array of objects {avg_rating, category, description, id, set_name, username}
      NavService.set = response[0];
      create.currentId = response[0].id;
      create.showNewSet = false;
    });
  }

  //  This function adds a card to the set.
  create.addCard = function() {
    create.activeCard.Id = create.currentId;
    CreateService.addCard(create.activeCard).then(function(response) {
      //  Returns array of objects {id, question, answer, set_id, q_image, a_image}
      //  Check to see if a comment exists, assign to card ID from response.
      if (create.comment) {
        create.addComment(response[0].id, create.cardComment, create.username);
        create.comment = false;
      }
      //  Add created card to the card array
      create.cards.push(response[0]);
      //  Clear image for questions and answers
      create.activeCard = {
        q_image: 'none',
        a_image: 'none'
      };
      //  Clear card comment
      create.cardComment = '';
    });
    //  Clear image choice display for questions and answers
    create.chooseQuestionImage = false;
    create.chooseAnswerImage = false;
  }

  //  This function adds a comment to the associated card.  It only runs if the create.comment value is true.
  create.addComment = function(Id, comment, username) {
    CreateService.addComment(Id, comment, username).then(function(response) {
    });
  }

  //  This function will run if the user clicks on previously-created cards in the sidebar.
  create.editCard = function(card, index) {
    //  Adds previous card
    create.addCard();
    card.username = create.username;
    create.edit = true;
    create.editIndex = index;
    create.activeCard = card;
    console.log(create.activeCard);
    CreateService.getComment(card).then(function(response) {
      create.cardComment = '';
      if (response.length != 0) {
        create.commentId = response[0].id;
        create.cardComment = response[0].comment;
      }

    });
  }

  //  This function marks completion of editing an existing card, and updates the database
  create.updateCard = function() {
    CreateService.updateCard(create.activeCard).then(function(response) {
      create.edit = false;
      create.cards[create.index] = response;
      if (create.comment) {
        CreateService.updateComment(create.cardComment, create.commentId);
        create.comment = false;
      }
      create.activeCard = {
        q_image: 'none',
        a_image: 'none'
      };
    });
    create.chooseQuestionImage = false;
    create.chooseAnswerImage = false;
  }

  //  Function to upload a question image
  create.uploadQuestion = function(file) {
    console.log('Upload question image');
    create.upload(file).then(function(filename) {
      create.activeCard.q_image = 'assets/' + filename;
    });
  }

  //  Function to upload an answer image
  create.uploadAnswer = function(file) {
    create.upload(file).then(function(filename) {
      create.activeCard.a_image = 'assets/' + filename;
    });
  }

  //  Basic upload image function
  create.upload = function (file) {
        return Upload.upload({
            url: 'flashcards/images',  //  Where does it go?  What does it do?
            data: {file: file, 'username': create.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data.filename);
            return resp.data.filename;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

  //  Marks the completion of a set.
  create.completeSet = function() {
    create.addCard();
    create.cards = [];
    create.newSet = {};
    create.activeCard = {
      q_image: 'none',
      a_image: 'none'
    };
    CreateService.completeSet();
  }
}
