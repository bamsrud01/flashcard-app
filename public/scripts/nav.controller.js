angular.module('flashcardApp')
  .controller('NavController', NavController);

function NavController(thing, $location) {
  var nav = this;
  nav.mirror = thing;
  //  What do I do with this?
}
