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
    //  Set the username of the created set to the logged-in user
    create.newSet.username = create.username;
    CreateService.createSet(create.newSet).then(function(response){
      //  Returns array of objects {avg_rating, category, description, id, set_name, username}
      //  set object in NavService will be set to the created set
      NavService.set = response[0];
      //  All created cards will belong to the active set.  Here, the set id is assigned
      create.currentId = response[0].id;
      //  Hide the new set options, and show the card creation options
      create.showNewSet = false;
    });
  }

  //  This function adds a card to the set.
  create.addCard = function() {
    //  Every time a card is created, it is assigned to the active set by the set ID
    create.activeCard.Id = create.currentId;
    CreateService.addCard(create.activeCard).then(function(response) {
      //  Returns array of objects {id, question, answer, set_id, q_image, a_image}
      //  Check to see if a comment exists, assign to card ID from response.
      if (create.comment) {
        //  Add a comment with body and username to the card ID
        create.addComment(response[0].id, create.cardComment, create.username);
        //  After submitting, reset the comment value
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
      console.log('Comment added:', response);
    });
  }

  //  This function will run if the user clicks on previously-created cards in the sidebar.
  create.editCard = function(card, index) {
    //  Adds previous card
    create.addCard();
    card.username = create.username;
    //  Shows the edit button
    create.edit = true;
    // create.editIndex = index;
    create.activeCard = card;
    console.log(create.activeCard);
    //  Get any comments on the selected card
    CreateService.getComment(card).then(function(response) {
      if (response.length != 0) {
        create.commentId = response[0].id;
        create.cardComment = response[0].comment;
      } else {
        create.cardComment = '';
      }

    });
  }

  //  This function marks completion of editing an existing card, and updates the database
  create.updateCard = function() {
    CreateService.updateCard(create.activeCard).then(function(response) {
      create.edit = false;
      create.cards[create.index] = response;
      //  Check if a comment exists, update, and reset value
      if (create.comment) {
        CreateService.updateComment(create.cardComment, create.commentId);
        create.comment = false;
      }
      //  Reset image values
      create.activeCard = {
        q_image: 'none',
        a_image: 'none'
      };
    });
    //  Reset image select options
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

  //  Basic upload image function using multer
  create.upload = function (file) {
        return Upload.upload({
            url: 'flashcards/images',
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
    // create.addCard();
    create.cards = [];
    create.newSet = {};
    create.activeCard = {
      q_image: 'none',
      a_image: 'none'
    };
    CreateService.completeSet();
  }
}
