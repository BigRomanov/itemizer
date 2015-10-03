var app = angular.module('pusherApp', ['ngMaterial', 'ui.sortable', 'gg.editableText']);

app.controller('ChecklistCtrl', function ($scope) {
  $scope.newItem = {};
  $scope.items = [
    {title:"Item 1"}, 
    {title:"Item 2"}, 
    {title:"Item 3"}, 
  ];

  $scope.$watchCollection('items', function listChange(newValue, oldValue) {
    console.log("itemListChange", oldValue, newValue);
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