app.controller('ProjectCtrl', function ($scope, $routeParams, Projects, $log) {
  $scope.init = function() {
    $scope.adding = false;
    $scope.editingTitle = false;
    $scope.loading = true;

    $scope.search = {}
    
    Projects.get({projectId:$routeParams.id}, function(project) {
      $log.log("Loaded project", project);
      $scope.project = project;
      $scope.loading = false;
    });
  }

  $scope.sortableOptions = {
    update: function(e, ui) {$log.log("Update called");},
    handle: '.itemHandle',
    stop:function(e, ui) {
      $log.log("Stop called");
      $log.log($scope.project.tasks);
      $scope.project.$update();
    }
  };

  $scope.searchTextChange = function(term) {
    $log.log("Search for:", term);
  }

  $scope.editTitle = function(item) {
    item.prevTitle = item.title;
  }

  $scope.update = function() {
    $scope.project.$update();
  }

  $scope.complete = function(task, complete) {
    task.complete = complete;
    $scope.update();
  }

  $scope.cancelEditTitle = function(item) {
    item.title = item.prevTitle;
  }

  $scope.editTask = function(_task) {
    _.each($scope.project.tasks, function(task) {
      task.edit = false;
    });

    _task.edit = true;
  }

  $scope.newTask = function() {
    _.each($scope.project.tasks, function(task) {
      task.edit = false;
    });
    var newTask = {edit:true}
    $scope.project.tasks.push(newTask);
  }

  $scope.cancelNewTask = function() {
    $scope.task = {};
    $scope.adding = false; 
  }

  $scope.addTask = function() {

    $scope.project.tasks.push($scope.task);
    $scope.project.$update();
  }

  $scope.init();
  
});