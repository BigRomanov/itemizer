'use strict';

app.factory('Projects', function ($resource) {
    return $resource('api/projects/:projectId', {
      checklistId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
