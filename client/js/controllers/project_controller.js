app.controller('ProjectCtrl', function($scope, $rootScope, $routeParams, Itemizer, Project, Task, $log, $mdDialog, $location) {
  $scope.init = function() {
    $scope.editing = false;

    $scope.loading = true;
    $scope.show_completed = false;

    $scope.search = {}

    async.parallel([
      function(callback) {
        Project.get({ projectId: $routeParams.id }, function(project) {
          $log.log("Loaded project", project);
          $scope.project = project;
          callback(null, 'projects');
        });
      },
      function(callback) {
        Task.query({projectId: $routeParams.id }, function(tasks) {
          $log.log("Loaded tasks", tasks);
          $scope.tasks = tasks;
          callback(null, 'tasks');
        });
      }
    ],
    function(err, results) {
      $scope.loading = false;
    });
  }

  $scope.sortableOptions = {
    update: function(e, ui) {
      $log.log("Update called");
    },
    handle: '.itemHandle',
    stop: function(e, ui) {
      $log.log("Stop called");
      $log.log($scope.project.tasks);
      $scope.project.$update();
    }
  };

  $scope.searchTextChange = function(term) {
    $log.log("Search for:", term);
  }

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

  $scope.saveTask = function() {
    $scope.task.$update(function(task) {
      console.log("Task updated", task);
      $scope.editing = false;
    });
  }

  $scope.newTask = function() {
    $scope.task = new Task();
    $scope.adding = true;
  }

  $scope.addTask = function() {
    $scope.task.$save(function(task) {

      $scope.adding = false;
    })
  }

  $scope.deleteTask = function(task) {
    $log.log("Delete task", task);
    var idx = $scope.project.tasks.indexOf(task);
    $scope.project.tasks.splice(idx, 1);
    $scope.update();
    $scope.editing = false;
  }

  $scope.showConfirm = function(ev, task) {
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