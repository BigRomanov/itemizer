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
}]);