'use strict';

app.factory('Project', function($resource) {
  return $resource('api/projects/:projectId', { 
    projectId: '@_id'
  }, {
    get: {
      method: 'GET',
      transformResponse: function(data, headers) {

        var project = angular.fromJson(data);

        // This is needed to create a Date object for each date in the data
        _.each(project.tasks, function(task) {
          if (task.due_date) {
            task.due_date = new Date(task.due_date);
          }
        });
        
        return project;
      }
    },
    update: {
      method: 'PUT',
      interceptor: {
        response: parseResponseDates
      }
    }
  });
});

function fixProjectDates(project) {
  _.each(project.tasks, function(task) {
    if (task.due_date && typeof task.due_date == 'string')
      task.due_date = new Date(task.due_date);
  });
}

function parseResponseDates(response) {
  var data = response.data;

  if (data.constructor === Array) {
    _.each(data, function(project) {
      fixProjectDates(project);
    });
  } else {
    fixProjectDates(data);
  }

  return response.data;
}
