angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('TaskCtrl', function($scope) {
  $scope.tasks = [
    { title: 'Change the header color', id: 1, done: false },
    { title: 'Add Ionicons to the header', id: 2, done: false },
    { title: 'Update the menu items', id: 3, done: false },
    { title: 'Implement a single task modal', id: 4, done: false },
    { title: 'Add push notifications', id: 5, done: false },
    { title: 'Share with the team', id: 6, done: false },
    { title: 'Integrate analytic service', id: 7, done: false }
  ];

  $scope.completeTask = function(taskId) {
    $scope.tasks.forEach(function(task){
      if (task.id === taskId) task.done = true;
    })
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
