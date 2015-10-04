var app = angular.module('pusherApp', ['ngRoute','ngResource','ngCookies','ngSanitize','ngMaterial','ui.sortable','gg.editableText']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: '/views/partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/library', {
        templateUrl: '/views/partials/library.html',
        controller: 'LibraryCtrl'
      }).      
      when('/checklists/:id', {
        templateUrl: '/views/partials/checklist.html',
        controller: 'ChecklistCtrl'
      }).
      when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]).
  run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });