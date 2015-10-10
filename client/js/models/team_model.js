'use strict';

app.factory('Teams', function($resource) {
  return $resource('api/teams/:teamId', {
    projectId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});