'use strict';

app.factory('Teams', function($resource) {
  return $resource('api/teams/:teamId', {
    teamId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});