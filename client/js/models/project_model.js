'use strict';

app.factory('Projects', function($resource) {
  return $resource('api/projects/:projectId', {
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
        console.log("zzzzz", project.tasks);
        _.each(project.tasks, function(task) {
          console.log("aaaa", task);
          if (task.due_date) {
            task.due_date = new Date(task.due_date);
          }

          console.log("parsed", task);
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
  console.log("Fix project", project);
  _.each(project.tasks, function(task) {
    if (task.due_date && typeof task.due_date == 'string')
      task.due_date = new Date(task.due_date);
  });
}

function parseResponseDates(response) {
  var data = response.data;

  if (data.constructor === Array) {
    console.log("array");
    _.each(data, function(project) {
      fixProjectDates(project);
    });
  } else {
    fixProjectDates(data);
  }

  return response.data;
}
