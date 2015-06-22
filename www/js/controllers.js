angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicUser, $ionicPush) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: $scope.loginData.username,
      bio: 'I come from planet Ion'
    });

    // Identify your user with the Ionic User Service
    return $ionicUser.identify(user);
  };

  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        // console.log(notification);
        return true;
      }
    });
  };

  // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });

  
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
    $scope.identifyUser().then(function() {
      $scope.pushRegister();
      $scope.closeLogin();
    });
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
