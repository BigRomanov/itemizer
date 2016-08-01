app.controller('DashboardCtrl', function($scope, $rootScope, $routeParams, ProjectManager, Project, Team, $timeout, $mdSidenav, $mdUtil, $log, $http) {
  $scope.init = function() {

    console.log("VIEW: ", $routeParams);
    // Select view from parameter
    if ($routeParams.view == "projects") {
      $scope.selectedView = 0;
    } else if ($routeParams.view == "tasks") {
      $scope.selectedView = 1;
    } else if ($routeParams.view == "calendar") {
      $scope.selectedView = 2;
    } else if ($routeParams.view == "teams") {
      $scope.selectedView = 3;
    } else {
      $scope.selectedView = 0;
    }

    $scope.adding = false;
    $scope.loading = true;

    $rootScope.$watch('team', function(newVal, oldVal) {
      console.log("Team change detected", newVal, oldVal);
      if (newVal)
        $scope.projects = newVal.projects;
    });

    ProjectManager.getTeams(function(teams) {
      $scope.teams = teams;
      ProjectManager.getProjects(Itemizer.currentTeamId, function(projects) {
        $scope.projects = projects;
        $scope.loading = false;
      })
    });
  }

  // Initialize the controller
  $scope.init();

  $scope.isLeftNavOpen = function(){
    return $mdSidenav('left').isOpen();
  };
  $scope.openLeftNav = function() {
    $mdSidenav('left').toggle();
  }

  $scope.editProject = function(project) {
    $scope.project = project;
    $scope.editing = true;
  }

  $scope.newProject = function() {
    $scope.project = {
      title: ""
    };
    $scope.adding = true;
  }

  $scope.cancelNewProject = function() {
    $scope.project = null;
    $scope.adding = false;
    $scope.editing = false;
  }

  $scope.updateProject = function() {
    console.log($scope.project);
    $scope.project.$update(function(project) {
      $scope.editing = false;
    });
  }

  $scope.addProject = function() {

    var project = new Project($scope.project);
    project.team = $rootScope.currentUser.currentTeam;
    project.$save(function(project) {
      $log.log("Project created", project);
      $scope.projects.unshift(project);
      $scope.adding = false;

    }, function(err) {
      console.log("Error", err);
    });

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

  $scope.edit = function(project) {
    $location.path('/project/' + project._id);
  }

  // Sidenav toggle
  $scope.toggleNav = buildToggler('right');
  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildToggler(navID) {
    var debounceFn = $mdUtil.debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function() {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
    return debounceFn;
  }

  // Tasklist view
  $scope.editTask = function(_task) {
    if ($scope.currentTask) {
      $scope.currentTask.edit = false;
    }

    $scope.currentTask = _task;

    _task.edit = true;
    $scope.editing = true;
  }

  $scope.cancelEditTask = function(task) {
    if (!task.title && !task.description) {
      $scope.deleteTask(task);
    }
    $scope.currentTask.edit = false;
    $scope.currentTask = null;
    task.edit = false;
    $scope.editing = false;
  }

  $scope.saveTask = function(task) {
    task.edit = false;
    $scope.editing = false;
    $scope.update();
  }




  // Calendar view
  $scope.dayFormat = "d";
  $scope.selectedDate = null;
  $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
  $scope.direction = 'horizontal';
  $scope.dayFormat = $scope.direction === "vertical" ? "EEEE, MMMM d" : "d";

  $scope.setDirection = function(direction) {
    $scope.direction = direction;
    $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
  };

  $scope.dayClick = function(date) {
    $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
  };

  $scope.prevMonth = function(data) {
    $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
  };

  $scope.nextMonth = function(data) {
    $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
  };

  $scope.setDayContent = function(date) {
    // You would inject any HTML you wanted for
    // that particular date here.
    return "<p></p>";
  };

  // Team view

  $scope.setCurrentTeam = function(team) {
    $rootScope.currentUser.currentTeam = teamId;
    ProjectManager.setCurrentTeam(function(err, team) {
      $log.log("Current team updated", team, "Error:", err);
      $scope.team = team
    });
  }

  $scope.createNewTeam = function() {
    $scope.newTeam = {
      title: "",
      default: false,
      members: []
    }
    $scope.adding = true;
  }

  $scope.cancelNewTeam = function() {
    $scope.newTeam = {
      title: "",
      default: false,
      members: []
    }
    $scope.adding = false;
  }

  $scope.addTeam = function() {
    $scope.adding = false;

    $scope.newTeam.members.push($rootScope.currentUser._id);

    $log.log("Adding team", $scope.newTeam);

    var newTeamResource = new Team($scope.newTeam);
    newTeamResource.$save(function(team, headers) {
      console.log("Added team", team);
      ProjectManager.teams.unshift(team);
    });
  }
});

app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  });
