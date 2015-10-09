'use strict';

app.factory('Organizations', function ($resource) {
    return $resource('api/organizations/:organizationId', {
      projectId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
