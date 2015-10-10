app.controller('TeamCtrl', function($scope, $routeParams, Teams, $log, $mdDialog) {
  $scope.init = function() {
    $scope.loading = true;
    $scope.inviting = false;
    $scope.invitees = [{
      email: "lala"
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

  $scope.sortableOptions = {
    update: function(e, ui) {
      $log.log("Update called");
    },
    handle: '.itemHandle',
    stop: function(e, ui) {
      $log.log("Stop called");
      $log.log($scope.project.tasks);
      $scope.project.$update();
    }
  };


  $scope.sendInvites = function() {
    $scope.inviting = false;
    var invites = _.filter($scope.invitees, function(invitee) {
      return invitee.email != "";
    });

    $log.log(invites);
  }

  $scope.inviteAnother = function() {
    $scope.invitees.push({});
  }

  $scope.init();

});