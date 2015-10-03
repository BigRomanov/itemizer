app.controller('ToolbarCtrl', function ($scope, $location) {
    $scope.goTo = function(path) {
      console.log("Go to", path);
      $location.path( path );
    }
});