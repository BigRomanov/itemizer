'use strict';

app.factory('Team', function($resource) {
  return $resource('api/teams/:teamId', {
    teamId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});