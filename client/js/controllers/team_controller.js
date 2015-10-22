app.controller('TeamCtrl', function($scope, $routeParams, Teams, $log, $http) {
  $scope.init = function() {
    $scope.loading = true;
    $scope.inviting = false;
    $scope.invites = "";
    $scope.search = {}

    Teams.get({
      teamId: $routeParams.id
    }, function(team) {
      $log.log("Loaded team", team);
      $scope.team = team;
      $scope.loading = false;
    });
  }

  $scope.sendInvites = function() {
    $scope.inviting = false;

    $http.post('/api/team_invites', {invites:$scope.invites, team:$scope.team._id}, {}).then(function(response) {
      console.log(response);
      $scope.team.invites = $scope.team.invites.concat(response.data.successes);
      $scope.team.$update();
      
    }, function(response) {
      // TODO: Add proper error reporting
      console.log("Invite failed failed", response);
    });
  }

  $scope.cancelInvite = function() {
    $scope.inviting = false;
  }

  $scope.init();

});