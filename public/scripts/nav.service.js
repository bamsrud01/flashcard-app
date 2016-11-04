angular.module('flashcardApp')
  .service('NavService', NavService);

function NavService() {

  var service = this;

  service.state = {
    loggedIn: false
  }

  service.categories = ['Language', 'Math', 'Science', 'History', 'Other'];

  service.set = {
    id: undefined
  }

  //  This value will be reset every time a user logs in, allowing the
  //  username to be accessible on every page
  service.userData = {
    username: false
  }

  //  This object holds the set ID when shifting between pages
  service.setData = {
    setId: ''
  }
}
