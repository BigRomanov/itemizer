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
    $scope.team = {title:"", members:[]}
    $scope.adding = true;
  }

  $scope.setCurrent = function(team) {
    $http.post('/user/team', {userId:$scope.user._id, teamId:team._id, teamTitle: team.title}).then(function(response) {
      $log.log("Team set as current");
      $scope.user.currentTeam = {id:team._id, title: team.title};
      
    }, function(response) {
      // TODO: Add proper error reporting
      $log.log("Unable to set team as current", response);
    });
  }

  $scope.addTeam = function() {
    $scope.adding = false;

    $scope.team.members.push($scope.user._id);

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