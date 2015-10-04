app.controller('LibraryCtrl', function ($scope, $http, Checklists, $location, $routeParams, $rootScope) {
  $scope.find = function() {
      Checklists.query(function(checklists) {
        $scope.checklists = checklists;
      });
    };

  $scope.createNewChecklist = function() {
    $scope.newChecklist = {title:"", steps:[]};
    $scope.newStep = {};
    $scope.editing = true;
  }

  $scope.saveNewChecklist = function() {
    $scope.editing = false;
    $scope.checklists.unshift($scope.newChecklist);

    console.log($scope.checklists);

    // Send to server
  }

  $scope.addStep = function() {
    $scope.newChecklist.steps.push($scope.newStep);
    $scope.newStep = {};
  }
});