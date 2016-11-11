angular.module('flashcardApp')
  .service('CalendarService', CalendarService);

function CalendarService($http) {
  var service = this;

  service.getCalendarInfo = function(username) {
    return $http.get('/calendar', {
      params: {
        username: username
      }
    }).then(function(response) {
      return response.data;
    });
  }
}
