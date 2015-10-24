app.controller('ProfileCtrl', function($scope, $rootScope, Teams, $http, $log) {
  $scope.user = $rootScope.currentUser;

  $scope.init = function() {
    $scope.adding = false;

    $scope.loading = true;
    Teams.query(function(teams) {
      $rootScope.currentUser.teams = teams;
      $scope.loading = false;
    });
  }

  $scope.init();


  $scope.setCurrent = function(team) {

    $http.post('/user/team', {
      userId: $scope.user._id,
      teamId: team._id,
      teamTitle: team.title
    }).then(function(response) {
      $rootScope.team = {
        id: team._id,
        title: team.title
      };

    }, function(response) {
      // TODO: Add proper error reporting
      $log.log("Unable to set team as current", response);
    });
  }

  $scope.newTeam = function() {
    $scope.team = {
      title: "",
      members: []
    }
    $scope.adding = true;
  }

  $scope.cancelNewTeam = function() {
    $scope.team = {
      title: "",
      members: []
    }
    $scope.adding = false;
  }

  $scope.addTeam = function() {
    $scope.adding = false;

    $scope.team.members.push($scope.user._id);

    $log.log("Adding team", $scope.team);

    $http.post('/api/teams', $scope.team, {}).then(function(response) {
      $rootScope.teams.unshift(response.data);
    }, function(response) {
      // TODO: Add proper error reporting
      $log.log("Team save failed", response);
    });
  }

});