'use strict';

app.factory('Trip', function($resource) {
  return $resource('api/trips/:tripId', {
    teamId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});