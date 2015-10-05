app.controller('ChecklistEditorCtrl', ['$scope', '$routeParams', 'Checklists', function ($scope, $routeParams, Checklists) {

  console.log("Editing checklist", $routeParams.id);

  $scope.init = function() {
    $scope.loading = true;
    var id = $routeParams.id;

    console.log("Load checklist with id", id);

    Checklists.get({checklistId:id}, function(checklist) {
      $scope.checklist = checklist;
      $scope.loading = false;
    });
  }

  $scope.saveChecklist = function() {
    Checklists.update({id:$scope.checklist._id}, $scope.checklist);
  }

  $scope.deleteChecklist = function() {
    // TODO: Add confirmation
    Checklists.delete({checklistId:id}, function(checklist) {
      console.log("Checklist deleted", checklist);
      $location.path('library');
    });
  }
}]);