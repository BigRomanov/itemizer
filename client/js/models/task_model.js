'use strict';

app.factory('Tasks', function($resource) {
  return $resource('api/tasks/:taskId', {
    projectId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});