app.filter('completed', function() {
  return function( items, completed) {
    var filtered = [];
    console.log(items, completed);
    angular.forEach(items, function(item) {
      if(item.complete == completed) {
        filtered.push(item);
      }
    });
    return filtered;
  };
});