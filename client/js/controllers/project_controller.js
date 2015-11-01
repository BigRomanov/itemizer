app.controller('ProjectCtrl', function ($scope, $rootScope, $routeParams, Project, Task, ProjectTask, $log, $mdDialog, $location) {
  $scope.init = function() {
    $scope.adding = false;
    $scope.editingTitle = false;
    $scope.loading = true;
    $scope.show_completed = false;

    $scope.search = {}
    
    Project.get({projectId:$routeParams.id}, function(project) {
      $log.log("Loaded project", project);
      $scope.project = project;

      $scope.loading = false;

      // Load all tasks for this project
      // ProjectTask.query({projectId:$routeParams.id}, function(tasks)) {
      //   $log.log("Loaded tasks", tasks);
      //   $scope.tasks = tasks;        

      //   $scope.loading = false;
      // });
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

  // Project management
  $scope.editTitle = function(item) {
    item.prevTitle = item.title;
  }

  $scope.update = function() {
    console.log("Updating project");
    if ($scope.project) {
      $scope.project.$update();
      //$scope.fixDates($scope.project);
    }
  }

  $scope.updateTitle = function() {
    $scope.editing = false;
    $scope.update(); 
  }

  $scope.deleteProject = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this project?')
          .content($scope.project.title)
          .ariaLabel('Delete confirmation')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');
    $mdDialog.show(confirm).then(function() {
      $scope.project.$delete();
      console.log("Go to dashboard");
      $location.path("#/dashboard");
    }, function() {
      // nothing to do
    });
  };

  // Task management
  $scope.complete = function(task, complete) {
    task.complete = complete;
    if (task.complete) {
      task.completed_date = new Date().toISOString();
      task.completed_by = $rootScope.currentUser;
    }
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
    $scope.editing = true;
  }

  $scope.cancelEditTask = function(task) {
    if (!task.title && !task.description) {
      $scope.deleteTask(task);
    }
    task.edit = false;
    $scope.editing = false; 
  }

  $scope.saveTask = function(task) {
    task.edit = false;
    $scope.editing = false;
    $scope.update();
  }

  $scope.newTask = function() {
    $scope.currentTask = new Task();
    $scope.editing = true;
  }

  $scope.addTask = function() {
    $scope.currentTask.$save(function(task) {
      $scope.project.tasks.push(task);  
      $scope.project.$update();
    })
  }

  $scope.deleteTask = function(task) {
    $log.log("Delete task", task);
    var idx = $scope.project.tasks.indexOf(task);
    $scope.project.tasks.splice(idx,1);
    $scope.update();
    $scope.editing = false;
  }

  $scope.showConfirm = function(ev, task) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this task?')
          .content(task.title)
          .ariaLabel('Delete confirmation')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');
    $mdDialog.show(confirm).then(function() {
      $scope.deleteTask(task);
    }, function() {
      // nothing to do
    });
  };

  $scope.init();
  
});