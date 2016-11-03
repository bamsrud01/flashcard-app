angular.module('flashcardApp')
  .service('NavService', NavService);

function NavService() {

  var service = this;

  service.state = {
    loggedIn: false
  }

  service.userData = {
    username: ''
  }
}
