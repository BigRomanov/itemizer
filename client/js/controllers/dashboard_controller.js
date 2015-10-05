app.controller('DashboardCtrl', function ($scope, Projects) {
  $scope.init = function() {
    $scope.adding = false;
    $scope.loading = true;
    Projects.query(function(projects) {
      console.log("Loading projects", projects);
      $scope.projects = projects;
      $scope.loading = false;
    });
  }
});