angular.module('flashcardApp')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController as register'
    }).when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController as home'
    }).when('/create', {
      templateUrl: 'views/create.html',
      controller: 'CreateController as create'
    }).when('/my-sets', {
      templateUrl: 'views/mine.html',
      controller: 'MySetsController as mine'
    }).when('/review', {
      templateUrl: 'views/review.html',
      controller: 'ReviewController as review'
    }).when('/calendar', {
      templateUrl: 'views/calendar.html',
      controller: 'CalendarController as calendar'
    }).otherwise({
      redirectTo:'/home'
    });

    $locationProvider.html5mode(true);
  });
