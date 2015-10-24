var app = angular.module('itemizerApp', ['ngRoute', 'ngResource', 'ngCookies', 'ngSanitize', 'ngMessages',
  'ngMaterial', 'ui.sortable', 'gg.editableText', 'materialCalendar', 'contenteditable', 'angularMoment','mdo-angular-cryptography'
]);

app.config(['$routeProvider', '$httpProvider', '$cryptoProvider',
  function($routeProvider, $httpProvider, $cryptoProvider) {
    // Initialize internal password for cryptography
    $cryptoProvider.setCryptographyKey('1t3m1z3rr');

    $routeProvider.
    when('/home', {
      templateUrl: '/views/partials/home.html',
      controller: 'HomeCtrl',
      resolve: {
        "check": function($location, $rootScope, $http) {
          if ($rootScope.currentUser) {
            // Check if the use has pending invites
            $http.get('/api/team_invites_for_email?status="pending"&email=' + $rootScope.currentUser.email).then(function(res) {
              console.log(res);
              if (res.data.length) // we have some pending invitations
                $location.path('invited');
            }, function(res) {
              console.log("Error retrieving invites", res)
              $location.path('dashboard'); //redirect user to home.
            });
          }
        }
      }
    }).
    when('/dashboard', {
      templateUrl: '/views/partials/dashboard.html',
      controller: 'DashboardCtrl'
    }).
    when('/invited', {
      templateUrl: '/views/partials/invited.html',
      controller: 'InvitedCtrl'
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
    when('/team/:id', {
      templateUrl: '/views/partials/team.html',
      controller: 'TeamCtrl'
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

    $httpProvider.interceptors.push(function($location, $q) {

      return {

        'responseError': function(rejection) {

          var defer = $q.defer();

          console.log($location.path());
          if (rejection.status == 401  && $location.path().indexOf("#/home") == -1) {
            // TODO: Add correct redirect to an original destination
            window.location = '/#/login'; //?redirectUrl=' + Base64.encode(document.URL);
          }

          defer.reject(rejection);

          return defer.promise;

        }
      };
    });
  }
]).
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
  // $rootScope.$on('event:auth-loginRequired', function() {
  //   $location.path('/login');
  //   return false;
  // });
});
