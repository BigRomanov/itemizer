app.controller('TP_DashboardCtrl', function($scope, $rootScope, $routeParams, TripPlanner, Project, Team, $timeout, $mdSidenav, $mdUtil, $log, $http) {
    $scope.init = function() {

        $scope.loading = true;

        $rootScope.$watch('team', function(newVal, oldVal) {
            console.log("Team change detected", newVal, oldVal);
            if (newVal)
                $scope.projects = newVal.projects;
        });

        TripPlanner.loadTrips(function(trips) {
            $scope.trips = trips;
        });
    }

    // Initialize the controller
    $scope.init();

    // Handle nav bar 
    $scope.isLeftNavOpen = function() {
        return $mdSidenav('left').isOpen();
    };
    $scope.openLeftNav = function() {
        $mdSidenav('left').toggle();
    }

    $scope.closeLeftNav = function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function() {});
    };

    $scope.createNewTrip = function() {
        $scope.newtrip = {
            title: ""
        };
        $scope.adding = true;
    }

    $scope.cancelNewTrip = function() {
        $scope.newtrip = null;
    }

    $scope.saveNewTrip = function() {

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

    $scope.deleteTrip = function(ev) {
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


    // Dashboard overview
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

app.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function() {
                $log.debug("close LEFT is done");
            });
    };
});