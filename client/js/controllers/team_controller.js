app.controller('TeamCtrl', function($scope, $rootScope, $routeParams, Teams, $log, $http, $mdDialog, $location) {
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

    $http.post('/api/team_invites', {
      invites: $scope.invites,
      team: $scope.team._id
    }, {}).then(function(response) {
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

  $scope.deleteTeam = function(ev) {
    // If this is a default team do not delete it
    if ($scope.team.default) {
      return;
    }

    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('Are you sure you want to delete this team?')
      .content($scope.team.title)
      .ariaLabel('Delete confirmation')
      .targetEvent(ev)
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      $http.delete('/api/teams/' + $scope.team._id, {}).then(function(response) {
        var index = $rootScope.teams.indexOf($scope.team);
        if (index > -1) {
          $rootScope.teams.splice(index, 1);
        }
        
        console.log("Team deleted");
        $location.path('/dashboard/teams');
      }, function(response) {
        // TODO: Add proper error reporting
        $log.log("Team delete failed", response);
      });
    }, function() {
      // nothing to do
    });
  };


  $scope.init();

});