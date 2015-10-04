app.controller('LibraryCtrl', function ($scope, $http, Checklists, $location, $routeParams, $rootScope) {
  $scope.find = function() {
      Checklists.query(function(checklists) {
        $scope.checklists = checklists;
      });
    };

  $scope.createNewChecklist = function() {
    $scope.newChecklist = {title:"", steps:[{}]};
    $scope.adding = true;
  }

  $scope.saveNewChecklist = function() {
    $scope.adding = false;
    $scope.checklists.unshift($scope.newChecklist);

    // Send to server
  }
});