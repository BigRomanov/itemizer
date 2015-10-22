app.controller('ToolbarCtrl', function($scope, $rootScope, $location, Auth, Teams) {
  $scope.init = function() {
    // Load list of teams use belongs to
    if (!$rootScope.teams) {
      $scope.loading = true;
      Teams.query(function(teams) {
        $rootScope.teams = teams;
        $scope.loading = false;

        if ($rootScope.currentUser && $rootScope.currentUser.currentTeam) {
          $rootScope.team = $rootScope.currentUser.currentTeam;  
        }
      });

    }
  }

  $scope.init();

  $scope.goTo = function(path) {
    console.log("Go to", path);
    $location.path(path);
  }

  var originatorEv;
  this.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  this.logout = function() {
    Auth.logout(function(err) {
      if (!err) {
        $location.path('/login');
      }
    });
  };

  this.inLogin = function() {
    return ($location.path().indexOf("login") > -1) || ($location.path().indexOf("signup") > -1);
  }


});