app.controller('ToolbarCtrl', function ($scope, $location) {
    $scope.goTo = function(path) {
      console.log("Go to", path);
      $location.path( path );
    }

    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    this.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
});