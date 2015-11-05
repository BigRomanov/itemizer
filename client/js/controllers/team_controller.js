app.controller('TeamCtrl', function($scope, $rootScope, $routeParams, Itemizer, Team, $log, $http, $mdDialog, $location) {
  $scope.init = function() {
    $scope.loading = true;
    $scope.inviting = false;
    $scope.invites = "";
    $scope.search = {};

    $scope.team = Itemizer.teamMap[$routeParams.id];
    $scope.loading = false;
      
    // console.log("Teams", $rootScope.teams);
    // $scope.team = _.find($rootScope.teams, function(team) {
    //   console.log(team);
    //   return team._id == $routeParams.id;
      
    // });

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

  $scope.setCurrent = function(team) {

    $http.post('/user/team', {
      userId: $rootScope.currentUser._id,
      teamId: team._id,
      teamTitle: team.title
    }).then(function(response) {
      $rootScope.currentUser.currentTeam = team._id;
      $rootScope.team = team;
    }, function(response) {
      // TODO: Add proper error reporting
      $log.log("Unable to set team as current", response);
    });
  }

  $scope.updateTitle = function() {
    $scope.team.$update(function(team) {
      console.log("Updated", team);
      $scope.editingTitle = false;      
    });
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

        // If the team we are deleting is active, move the active to the default team
        if ($scope.team._id == $scope.currentUser.currentTeam) {
          _.each($rootScope.teams, function(team) {
            if (team.default) {
              $scope.setCurrent(team);
            }
          });
        }

        // Remove team from the list
        $rootScope.teams = _.reject($rootScope.teams, function(team) {
          return (team._id == $scope.team._id);
        });
        
        console.log("Team deleted", $rootScope.teams);
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