'use strict';

app.factory('Task', function($resource) {
  return $resource('api/tasks/:taskId', {
    teamId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});