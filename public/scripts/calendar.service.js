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

  service.getDateEvents = function(username, date) {
    console.log('SERVICE receiving:', username, date);
    return $http.get('/calendar/date', {
      params: {
        username: username,
        date: date
      }
    }).then(function(response) {
      console.log('SERVICE getting response:', response.data);
      return response.data;
    })
  }
}
