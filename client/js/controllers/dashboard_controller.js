app.controller('DashboardCtrl', function($scope, Projects,$timeout, $mdSidenav, $mdUtil, $log, $http) {
  $scope.init = function() {
    $scope.adding = false;
    $scope.loading = true;
    Projects.query(function(projects) {
      $log.log("Loading projects", projects);
      $scope.projects = projects;

      // Task accumulator
      $scope.tasks = [];

      _.each($scope.projects, function(project) {
        if (project.tasks && project.tasks.length > 0) {
          $log.log(project.tasks)
          $scope.tasks = $scope.tasks.concat(project.tasks);
          project.unfinished = _.reduce(project.tasks, function(memo, task){ 
            if (task && task.complete) return memo; 
            else return memo + 1; }, 0);
        }
      });

      $log.log("Loading tasks", $scope.tasks);

      $scope.loading = false;
    });
  }

  $scope.newProject = function() {
    $scope.project = {
      title: "",
      tasks: []
    };
    $scope.adding = true;
  }

  $scope.cancelNewProject = function() {
    $scope.project = {
      title: "",
      steps: []
    };
    $scope.adding = false;
  }

  $scope.addProject = function() {
    $scope.adding = false;

    $http.post('/api/projects', $scope.project, {}).then(function(response) {
      $log.log("Project created", response);
      $scope.projects.unshift(response.data);
      
    }, function(response) {
      // TODO: Add proper error reporting
      $log.log("Project save failed", response);
    });
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
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },200);
      return debounceFn;
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
});