var app = angular.module('pusherApp', ['ngRoute', 'ngResource', 'ngCookies', 'ngSanitize', 
  'ngMaterial', 'ui.sortable', 'gg.editableText', 'materialCalendar']);

app.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
    when('/home', {
      templateUrl: '/views/partials/home.html',
      controller: 'HomeCtrl',
      resolve: {
        "check": function($location, $rootScope) {
          if ($rootScope.currentUser) {
            $location.path('dashboard'); //redirect user to home.
          }
        }
      }
    }).
    when('/dashboard', {
      templateUrl: '/views/partials/dashboard.html',
      controller: 'DashboardCtrl'
    }).
    when('/library', {
      templateUrl: '/views/partials/library.html',
      controller: 'LibraryCtrl'
    }).
    when('/projects', {
      templateUrl: '/views/partials/projects.html',
      controller: 'ProjectsCtrl'
    }).
    when('/project/:id', {
      templateUrl: '/views/partials/project.html',
      controller: 'ProjectCtrl'
    }).
    when('/checklist/:id/edit', {
      templateUrl: '/views/partials/checklist_editor.html',
      controller: 'ChecklistEditorCtrl'
    }).
    when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'SignupCtrl'
    }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      resolve: {
        "check": function($location, $rootScope) {
          // if ($rootScope.currentUser) {
          //   $location.path('#/home'); //redirect user to home.
          // }
        }
      }
    }).
    when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });
  }
]).
config(function($mdThemingProvider) {
  // Configure a dark theme with primary foreground yellow
  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .dark();
}).
run(function($rootScope, $location, Auth) {

  //watching the value of the currentUser variable.
  $rootScope.$watch('currentUser', function(currentUser) {
    // if no currentUser and on a page that requires authorization then try to update it
    // will trigger 401s if user does not have a valid session
    if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1)) {
      Auth.currentUser();
    }
  });

  // On catching 401 errors, redirect to the login page.
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
    return false;
  });
});