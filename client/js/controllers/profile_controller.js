app.controller('ProfileCtrl', function ($scope, $rootScope, Teams, $http, $log) {
  $scope.user = $rootScope.currentUser;

  $scope.init = function() {
    $scope.adding = false;
    $scope.loading = true;
    Teams.query(function(teams) {
      $scope.teams = teams;
      $scope.loading = false;
    });
  }

  $scope.init();

  $scope.newTeam = function() {
    $scope.team = {}
    $scope.adding = true;
  }

  $scope.addTeam = function() {
    $scope.adding = false;

    $log.log("Adding team", $scope.team);

    $http.post('/api/teams', $scope.team, {}).then(function(response) {
      $log.log("Team added");
      $scope.teams.unshift($scope.team);
      
    }, function(response) {
      // TODO: Add proper error reporting
      $log.log("Team save failed", response);
    });
  }

});