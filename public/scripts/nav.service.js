angular.module('flashcardApp')
  .service('NavService', NavService);

function NavService() {

  var service = this;

  //  Marks whether a user is logged in
  service.state = {
    loggedIn: false
  }

  //  Categories are taken from here
  service.categories = ['Language', 'Math', 'Science', 'History', 'Other'];

  //  Shows the currently active set of flashcards
  service.set = {
    id: undefined
  }

  //  This value is set on login allowing the username to be used on every page.
  service.userData = {
    username: false
  }

  //  This object holds the set ID when shifting between pages
  service.setData = {
    setId: ''
  }
}
