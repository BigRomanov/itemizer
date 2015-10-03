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
      otherwise({
        redirectTo: '/home'
      });
  }]);