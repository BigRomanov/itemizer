app.controller('LibraryCtrl', function($scope, $http, Checklists, $location, $routeParams, $rootScope) {
  $scope.init = function() {
    $scope.adding = false;
    $scope.loading = true;
    Checklists.query(function(checklists) {
      $scope.checklists = checklists;
      $scope.loading = false;
    });
  }

  $scope.edit = function(checklist) {
    console.log("Edit checklist: " + checklist._id);
    var path = 'checklist/' + checklist._id + '/edit';
    console.log(path)
    $location.path(path);
  };

  $scope.newChecklist = function() {
    $scope.checklist = {
      title: "",
      steps: []
    };
    $scope.adding = true;
  }

  $scope.cancelNewChecklist = function() {
    // Reset new step
    $scope.checklist = {
      title: "",
      steps: []
    };
    $scope.adding = false;
  }

  $scope.addChecklist = function() {
    $scope.adding = false;
    $scope.checklists.unshift($scope.checklist);

    console.log($scope.checklists);

    $http.post('/api/checklists', $scope.checklist, {}).then(function(response) {
      console.log("Checklist saved successfully", response);
      var id = response.data._id;
      $location.path("#/checklist/" + id);
    }, function(response) {
      // TODO: Add proper error reporting
      console.log("Checklist save failed", response);
    });
  }

  $scope.addStep = function() {
    $scope.newChecklist.steps.push($scope.newStep);
    $scope.newStep = {};
  }

  // $scope.init();
});