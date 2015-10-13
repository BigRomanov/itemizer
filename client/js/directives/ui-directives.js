app.directive('task', function() {
    return {
        restrict: 'E',
        templateUrl: 'task.html',
        scope: {
            type: '='
        }
    };
});