app.controller('TeamCtrl', function($scope, $routeParams, Teams, $log, $mdDialog) {
  $scope.init = function() {
    $scope.loading = true;
    $scope.inviting = false;
    $scope.invitees = [{
      email: "",
      invited: Date.now(),
      status: "pending"
    }];
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
    var invites = _.filter($scope.invitees, function(invitee) {
      return invitee.email;
    });

    $log.log("Inviting", invites);
    $scope.team.invites = invites;
    $scope.team.$update();
  }

  $scope.inviteAnother = function() {
    $scope.invitees.push({
      email: "",
      invited: Date.now(),
      status: "pending"
    });
  }

  $scope.init();

});