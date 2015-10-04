'use strict';

app.factory('Checklists', function ($resource) {
    return $resource('api/checklists/:checklistId', {
      blogId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
