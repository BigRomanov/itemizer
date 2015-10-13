app.controller('ProjectCtrl', function ($scope, $routeParams, Projects, $log, $mdDialog, $location) {
  $scope.init = function() {
    $scope.adding = false;
    $scope.editingTitle = false;
    $scope.loading = true;
    $scope.show_completed = false;

    $scope.search = {}
    
    Projects.get({projectId:$routeParams.id}, function(project) {
      $log.log("Loaded project", project);
      $log.log(typeof project.tasks[0].due_date, project.tasks[0].due_date);
      

      // Parse dates, consider doing this with interceptor
      _.each(project.tasks, function(task) {
        task.due_date = new Date(task.due_date);
      });

      $log.log(typeof project.tasks[0].due_date);

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
    console.log("Updating project");
    if ($scope.project)
      $scope.project.$update();
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
    $scope.editing = true;
  }

  $scope.saveTask = function(task) {
    task.edit = false;
    $scope.editing = false;
    $scope.update();
  }

  $scope.newTask = function() {
    _.each($scope.project.tasks, function(task) {
      task.edit = false;
    });
    var newTask = {edit:true}
    $scope.project.tasks.push(newTask);
    $scope.editing = true;
  }

  $scope.cancelEditTask = function(task) {
    if (!task.title && !task.description) {
      $scope.deleteTask(task);
    }
    task.edit = false;
    $scope.editing = false; 
  }


  $scope.addTask = function() {

    $scope.project.tasks.push($scope.task);
    $scope.project.$update();
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