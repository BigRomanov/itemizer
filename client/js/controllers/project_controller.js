app.controller('ProjectCtrl', function ($scope, $routeParams, Projects) {
  $scope.init = function() {
    $scope.adding = false;
    $scope.loading = true;
    console.log("Load project with id", $routeParams.id)
    Projects.get({projectId:$routeParams.id}, function(project) {
      console.log("Loaded project", project);
      $scope.project = project;
      $scope.loading = false;
    });
  }

  $scope.init();
  
});