app.controller('ProjectsCtrl', function($scope, $http, Projects, $location, $routeParams, $rootScope) {
  $scope.init = function() {
    $scope.adding = false;
    $scope.loading = true;
    Projects.query(function(projects) {
      console.log("Loading projects", projects);
      $scope.projects = projects;
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
      console.log("Project created");
      $scope.projects.unshift($scope.project);
      
    }, function(response) {
      // TODO: Add proper error reporting
      console.log("Project save failed", response);
    });
  }

  $scope.edit = function(project) {
    $location.path('/project/' + project._id);
  }
});