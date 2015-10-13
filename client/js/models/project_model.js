'use strict';

app.factory('Projects', function($resource) {
  return $resource('api/projects/:projectId', {
    projectId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});


// Think about converting dates with an interceptor

// function parseResponseDates(response) {
//   var data = response.data, key, value;
//   for (key in data) {
//     if (!data.hasOwnProperty(key) && // don't parse prototype or non-string props
//         toString.call(data[key]) !== '[object String]') continue;
//     value = Date.parse(data[key]); // try to parse to date
//     if (value !== NaN) data[key] = value;
//   }
//   return response;
// }

// return $resource('/books/:id', {id: '@id'},
//   {
//     'update': {
//       method: 'PUT', 
//       isArray: true, 
//       interceptor: {response: parseResponseDates}
//     },
//     ....
//   }
// );