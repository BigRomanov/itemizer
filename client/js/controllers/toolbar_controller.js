app.controller('ToolbarCtrl', function($scope, $rootScope, $location, Auth, Team, $log, $http) {
  $scope.init = function() {}

  $scope.init();

  $rootScope.$watch('currentUser', function() {
    $scope.init();
  });

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
        $rootScope.curentUser = null;
        $location.path('/login');
      }
    });
  };

  this.updateTeam = function() {
    console.log("Current team", $rootScope.currentUser.currentTeam);

    $http.post('/user/team', {
      userId: $rootScope.currentUser._id,
      teamId: $rootScope.currentUser.currentTeam,
    }).then(function(response) {
      $rootScope.team = _.find($rootScope.teams, function(team) {
        return team._id == $rootScope.currentUser.currentTeam;
      });
    }, function(response) {
      // TODO: Add proper error reporting
      $log.log("Unable to set team as current", response);
    });


  }

  this.inLogin = function() {
    return ($location.path().indexOf("login") > -1) || ($location.path().indexOf("signup") > -1);
  }


});