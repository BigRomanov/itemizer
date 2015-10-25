app.controller('ToolbarCtrl', function($scope, $rootScope, $location, Auth, Teams) {
  $scope.init = function() {
    
    if ($rootScope.currentUser) {
      $scope.loading = true;

      Teams.query(function(teams) {
        $scope.teams = teams;
        $scope.loading = false;
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
        $rootScope.curentUser = null;
        $location.path('/login');
      }
    });
  };

  this.inLogin = function() {
    return ($location.path().indexOf("login") > -1) || ($location.path().indexOf("signup") > -1);
  }


});