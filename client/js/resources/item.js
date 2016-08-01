'use strict';

app.factory('Item', function($resource) {
  return $resource('api/items/:itemId', {
    teamId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});