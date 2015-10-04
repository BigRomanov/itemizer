app.controller('LibraryCtrl', function ($scope, Checklists, $location, $routeParams, $rootScope) {
  $scope.find = function() {
      Checklists.query(function(checklists) {
        $scope.checklists = checklists;
      });
    };
});