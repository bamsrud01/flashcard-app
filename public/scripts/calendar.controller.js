angular.module('flashcardApp')
  .controller('CalendarController', CalendarController);

function CalendarController(CalendarService, NavService) {
  var calendar = this;

  calendar.username = NavService.userData.username;

}
