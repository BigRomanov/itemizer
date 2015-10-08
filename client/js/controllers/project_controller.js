app.controller('ProjectCtrl', function ($scope, $routeParams, Projects, $log) {
  $scope.init = function() {
    $scope.adding = false;
    $scope.editingTitle = false;
    $scope.loading = true;
    
    Projects.get({projectId:$routeParams.id}, function(project) {
      $log.log("Loaded project", project);
      $scope.project = project;
      $scope.loading = false;
    });
  }

  $scope.updateProject = function() {
    $log.log("updateProject");
  }

  $scope.editTitle = function() {
    $scope.prevTitle = $scope.project.title;
    // $scope.editingTitle = true;
  }

  $scope.saveTitle = function() {
    // $scope.editingTitle = false;
    $scope.project.$update();
  }

  $scope.cancelEditTitle = function() {
    $scope.project.title = $scope.prevTitle;
    // $scope.editingTitle = false;
  }

  $scope.newTask = function() {
    $scope.task = {};
    $scope.adding = true;
  }

  $scope.cancelNewTask = function() {
    $scope.task = {};
    $scope.adding = false; 
  }

  $scope.addTask = function() {
    $scope.adding = false;

    $scope.project.tasks.push($scope.task);
    $scope.project.$update();
  }

  $scope.init();
  
});