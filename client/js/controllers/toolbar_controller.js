app.controller('ToolbarCtrl', function($scope, $location, Auth, Teams) {
  $scope.init = function() {
    // Load list of teams use belongs to
    Teams.query(function(teams) {
      $scope.teams = teams;
      console.log("Teams:", teams);
    });
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