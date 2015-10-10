app.controller('TeamCtrl', function($scope, $routeParams, Teams, $log, $mdDialog) {
  $scope.init = function() {
    $scope.loading = true;
    $scope.inviting = false;
    $scope.invitees = [{
      email: ""
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


  $scope.sendInvitations = function() {
    $scope.inviting = false;
  }

  $scope.inviteAnother = function() {
    $scope.invitees.push({
      email: ""
    });
  }


  $scope.$watchCollection(
    "invitees",
    function(newValue, oldValue) {
      $log.log(newValue, oldValue);
    }
  );

  $scope.init();

});