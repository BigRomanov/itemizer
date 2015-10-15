'use strict';

app.factory('Project', function($resource) {
  return $resource('api/projects/:projectId', {
    projectId: '@_id'
  }, {
    query: {
      method: 'GET',
      interceptor: {
        response: parseResponseDates
      },
      isArray:true
    },
    get: {
      method: 'GET', 
      interceptor: {
        response: parseResponseDates
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
  console.log("zzzzzzzz", data);

  if (data.constructor === Array) {
    console.log("array");
    _.each(data, function(project) {
      fixProjectDates(project);
    });
  }
  else {
    console.log('project');
    fixProjectDates(data);
  }

  // for (key in data) {
  //   if (!data.hasOwnProperty(key) && // don't parse prototype or non-string props
  //     toString.call(data[key]) !== '[object String]') continue;
  //   value = Date.parse(data[key]); // try to parse to date
  //   if (value !== NaN) {
  //     console.log("aaaaaaa", key, value);
  //     data[key] = value;
  //   }
  // }
  console.log(response);
  return response;
}