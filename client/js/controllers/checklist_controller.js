app.controller('ChecklistCtrl', function ($scope) {
  $scope.newItem = {};
  $scope.items = [
    {title:"Item 1"}, 
    {title:"Item 2"}, 
    {title:"Item 3"}, 
  ];

  $scope.sortableOptions = {
    update: function(e, ui) {console.log("Update called");},
    handle: '.itemHandle'
    // stop:function(e, ui) {
    //   console.log("Stop called");
    // }
  };


  // Refactor this to be handled in sortable update method
  $scope.$watchCollection('items', function listChange(newValue, oldValue) {
    console.log("itemListChange", oldValue, newValue);
    // Set new indices to the list items
    _.each($scope.items, function(item, index) {
      item.index = index;
      console.log(item);
    });
  });

  $scope.addItem = function() {
    console.log("Add message: " + $scope.newMessage);
    if ($scope.newMessage) {
      $scope.messages.unshift($scope.newMessage);
    }
  }

  $scope.editItem = function(item) {
    console.log("Edit item", item);
  }
});