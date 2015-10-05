app.controller('LibraryCtrl', function ($scope, $http, Checklists, $location, $routeParams, $rootScope) {
  $scope.init = function() {
    $scope.adding = false;
  }

  $scope.find = function() {
      $scope.loading=true;
      Checklists.query(function(checklists) {
        $scope.checklists = checklists;
        $scope.loading = false;
      });
    };

  $scope.newChecklist = function() {
    $scope.checklist = {title:"", steps:[]};
    $scope.adding = true;
  }

  $scope.cancelNewChecklist = function() {
    // Reset new step
    $scope.checklist = {title:"", steps:[]};
    $scope.adding = false;
  }

  $scope.addChecklist = function() {
    $scope.adding = false;
    $scope.checklists.unshift($scope.checklist);

    console.log($scope.checklists);

    $http.post('/api/checklists', $scope.checklist, {}).then(function(response) {
      console.log("Checklist saved successfully", response);
    }, function(response) {
      console.log("Checklist save failed", response);
    });
  }

  $scope.addStep = function() {
    $scope.newChecklist.steps.push($scope.newStep);
    $scope.newStep = {};
  }

  $scope.init();
});