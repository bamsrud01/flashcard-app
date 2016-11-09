angular.module('flashcardApp')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/register', {
      //  Register - New users sign up for an account
      templateUrl: 'views/register.html',
      controller: 'RegisterController as register'
    }).when('/home', {
      //  Home - The home page of the app
      templateUrl: 'views/home.html',
      controller: 'HomeController as home'
    }).when('/create', {
      //  Create - Registered users can create, update, or delete flashcard sets
      templateUrl: 'views/create.html',
      controller: 'CreateController as create'
    }).when('/my-sets', {
      //  My Sets - Registered users can see sets that they have created
      templateUrl: 'views/mine.html',
      controller: 'MySetsController as mine'
    }).when('/review', {
      //  Review - Users can practice flashcard sets, and get their results
      templateUrl: 'views/review.html',
      controller: 'ReviewController as review'
    }).when('/cards', {
      templateUrl: 'views/cards.html',
      controller: 'CardsController as cards'
    }).when('/calendar', {
      //  Calendar - Users can see dates to review flashcards
      templateUrl: 'views/calendar.html',
      controller: 'CalendarController as vm'
    }).otherwise({
      //  Sets home to be the default page
      redirectTo:'/home'
    });

    $locationProvider.html5Mode(true);
  });
