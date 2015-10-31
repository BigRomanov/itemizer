app.controller('DashboardCtrl', function($scope, $rootScope, $routeParams, Project, Team, TeamProject, $timeout, $mdSidenav, $mdUtil, $log, $http) {
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

    $scope.projects = [];
    $rootScope.$watch('team', function(newVal, oldVal) {
      console.log("Team change detected", newVal, oldVal);
      if (newVal)
        $scope.projects = newVal.projects;
    });

    $scope.adding = false;
    $scope.loading = true;

    // Load tasks for current project

    TeamProject.query({teamId:$rootScope.currentUser.currentTeam}, function(projects) {
      $log.log("Loading projects", projects);
      $scope.projects = projects;

      // Task accumulator
      $scope.tasks = [];

      _.each($scope.projects, function(project) {
        if (project.tasks && project.tasks.length > 0) {
          $log.log(project.tasks)
          $scope.tasks = $scope.tasks.concat(project.tasks);
          project.unfinished = _.reduce(project.tasks, function(memo, task) {
            if (task && task.complete) return memo;
            else return memo + 1;
          }, 0);
        }
      });

      $log.log("Loading tasks", $scope.tasks);

      $scope.loading = false;
    });
  }

  $scope.newProject = function() {
    $scope.project = {
      title: ""
    };
    $scope.adding = true;
  }

  $scope.cancelNewProject = function() {
    $scope.project = {
      title: ""
    };
    $scope.adding = false;
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

    // $http.post('/api/projects', $scope.project, {}).then(function(response) {
    //   $log.log("Project created", response);
    //   $scope.projects.unshift(response.data);

    // }, function(response) {
    //   // TODO: Add proper error reporting
    //   $log.log("Project save failed", response);
    // });
  }

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
  $scope.setCurrent = function(team) {

    $http.post('/user/team', {
      userId: $rootScope.currentUser._id,
      teamId: team._id,
      teamTitle: team.title
    }).then(function(response) {
      $rootScope.currentUser.currentTeam = team._id;
      $rootScope.team = team;
    }, function(response) {
      // TODO: Add proper error reporting
      $log.log("Unable to set team as current", response);
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
      $rootScope.teams.unshift(team);
    });
  }

});