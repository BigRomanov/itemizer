app.controller('InvitedCtrl', function($scope, $rootScope, $http) {

  $scope.init = function() {
    if ($rootScope.currentUser) {
      // Check if the use has pending invites
      $http.get('/api/team_invites_for_email?status="pending"&email=' + $rootScope.currentUser.email).then(function(res) {
        console.log(res);
        if (res.data.length) {// we have some pending invitations
          console.log("Invites:", res.data);
          $scope.invites = res.data;
        }
      }, function(res) {
        console.log("Error retrieving invites", res)
      });
    }
  }

  $scope.init();

});