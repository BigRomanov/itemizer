'use strict';

app.service('TripPlanner', ['Trip', '$log', '$http', function(Trip, $log, $http) {

  this.loadTrips = function(callback) {
    Trip.query(function(trips) {
      callback(trips);
    });
  }
}]);
