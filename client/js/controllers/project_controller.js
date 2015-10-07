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

  $scope.newTask = function() {
    console.log("newTask");
    $scope.task = {};
    $scope.adding = true;
  }

  $scope.cancelNewTask = function() {
    $scope.task = {};
    $scope.adding = false; 
  }

  $scope.addTask = function() {
    console.log("addTask", $scope.task);
    $scope.adding = false;

    console.log("aaaaaa", $scope.project.tasks);
    $scope.project.tasks.push($scope.task);
    $scope.project.title = "Updated title";
    console.log("aaaaaa 222", $scope.project.tasks, $scope.project);

    console.log("Updating project", $scope.project);
    $scope.project.$update();
  }

  $scope.init();
  
});