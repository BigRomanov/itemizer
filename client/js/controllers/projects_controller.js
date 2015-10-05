app.controller('ProjectsCtrl', function($scope, $http, Checklists, $location, $routeParams, $rootScope) {
  $scope.init = function() {
    $scope.adding = false;
    $scope.loading = true;
    Projects.query(function(projects) {
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

    console.log($scope.projects);

    $http.post('/api/projects', $scope.project, {}).then(function(response) {
      $scope.projects.unshift($scope.project);
      
    }, function(response) {
      // TODO: Add proper error reporting
      console.log("Project save failed", response);
    });
  }
});