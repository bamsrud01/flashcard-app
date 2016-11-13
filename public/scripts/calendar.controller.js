angular.module('flashcardApp')
  .controller('CalendarController', CalendarController);

function CalendarController(CalendarService, NavService, moment, alert, calendarConfig) {
  var vm = this;

  vm.username = NavService.userData.username;

  vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];
    vm.events = [];

    vm.cellIsOpen = false;

    // vm.eventClicked = function(event) {
    //   console.log('Clicked', event);
    // };
    //
    // vm.eventEdited = function(event) {
    //   alert.show('Edited', event);
    // };
    //
    // vm.eventDeleted = function(event) {
    //   alert.show('Deleted', event);
    // };
    //
    // vm.eventTimesChanged = function(event) {
    //   alert.show('Dropped or resized', event);
    // };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {
      console.log('Clicked cell:', date, cell);
      vm.chosenDate = date.toDateString();
      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = false;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }
      console.log('CONTROLLER sending:', vm.username, date);
      vm.getDateEvents(vm.username, vm.chosenDate);

    };

    vm.getDateEvents = function(username, date) {
      CalendarService.getDateEvents(username, date).then(function(response) {
        vm.eventsOnDate = response;
        vm.eventsOnDate.forEach(function(event) {
          event.date_used = new Date(event.date_used).toDateString();
          event.review_date = new Date(event.review_date).toDateString();
        });
        console.log('Date selected:', vm.eventsOnDate);
      })
    }

    //  Function to get calendar info
    vm.getCalendarInfo = function() {
      CalendarService.getCalendarInfo(vm.username).then(function(response) {
        console.log('Calendar events:', response);
        vm.studyEvents = response;
        vm.scheduleAll();
        //  Returns array of objects {avg_rating, category, correct, date_used, description, favorited, id(sets), proficiency, review_date, set_id, set_name, total, username(sets?)}
      });
    }

    vm.scheduleAll = function() {
      vm.studyEvents.forEach(function(event) {
        vm.events.push({
          title: 'Set reviewed: ' + event.set_name,
          startsAt: moment(event.date_used).startOf('day').add(12, 'hours').toDate(),
          endsAt: moment(event.date_used).startOf('day').add(20, 'hours').toDate(),
          color: calendarConfig.colorTypes.important,
          draggable: false,
          resizable: false,
          incrementsBadgeTotal: false
        });
        vm.events.push({
          title: 'Review Set: ' + event.set_name,
          startsAt: moment(event.review_date).startOf('day').add(12, 'hours').toDate(),
          endsAt: moment(event.review_date).startOf('day').add(20, 'hours').toDate(),
          color: calendarConfig.colorTypes.info,
          draggable: false,
          resizable: false,
          incrementsBadgeTotal: false
        });
      });
    }

    vm.getCalendarInfo();
}
