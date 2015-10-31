'use strict';

app.factory('ProjectTask', function($resource) {
  return $resource('api/projects/:projectId/tasks/:taskId', {
    projectId: '@_id'
  }, {
    query: {
      method: 'GET',
      interceptor: {
        response: parseResponseDates
      },
      isArray: true
    },
    get: {
      method: 'GET',
      transformResponse: function(data, headers) {
        console.log("transforming", data);
        var project = angular.fromJson(data);
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