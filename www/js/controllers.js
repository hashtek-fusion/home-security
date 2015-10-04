angular.module('rvhHome.controllers', [])

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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('DeviceCtrl', function($scope, $http, $ionicLoading,$ionicPopup,$urlUtil) {
    $scope.takePhoto = function(){
      $ionicLoading.show({
        template: 'Loading...'
      });
      var msgResponse='';
      var fileName='TesselPicture' + Math.floor(Date.now()*1000);
      var queryParts=[];
      queryParts.push('msg=TAKE_PHOTO');
      queryParts.push('name='+fileName);
      var queryParam=queryParts.join('&');
      var urlToPublish=$urlUtil.publishAPI()+'?'+queryParam;
      console.log('URL to publish::' + urlToPublish);
      $http.get(urlToPublish).then(function (data) {
        $scope.msgResponse=data.MessageId;
        $http.get($urlUtil.storageAPI()+'/photo?name='+fileName).then(function (reponse) {
          $scope.photo = response.data;
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Tessel Capture Photo',
            template: 'Capturing photo request submitted successfully!!' + msgResponse
          });
          alertPopup.then(function(res) {
            console.log('Request submitted successfully');
          });
        },function(err){
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Tessel Capture Photo',
            template: 'Issue in capturing photo:' + JSON.stringify(err.data.message)
          });
          if(err.data.code==='NoSuchKey'){//There was a delay in image upload by Tessel device
            $scope.actionItem='There was a delay in photo upload by Tessel. The photo name uplaoded by Tessel is -' + fileName + '.jpg. Try to get this few seconds later by entering the name of the photo below' ;
            $scope.photoName=fileName;
          }
        });
      }, function(err){//Error in publishing request
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Tessel Capture Photo',
          template: 'Issue in publishing request' + JSON.stringify(err.data.message)
        });
      });
    }

    $scope.getPhoto = function(){
      $ionicLoading.show({
        template: 'Loading...'
      });
      console.log('Name of the photo to download::' + $scope.photoName);
      $http.get($urlUtil.storageAPI()+'/photo?name='+$scope.photoName).then(function(response){
        console.log('Response for get photo :' + JSON.stringify(response));
        $scope.photo = response.data;
        $ionicLoading.hide();
        $scope.actionItem='';
      }, function(err){
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Tessel Capture Photo',
          template: 'Issue in capturing photo:' + JSON.stringify(err.data.message)
        });
        if(err.data.code==='NoSuchKey'){//There was a delay in image upload by Tessel device
          $scope.actionItem='There was a delay in photo upload by Tessel.Try to get this photo later' ;
        }
      })
    }
})

.controller('PhotoArchiveCtrl', function($scope, $http,$ionicLoading,$urlUtil,$ionicPopup){
    $ionicLoading.show({
      template: 'Loading...'
    });
    $http(
      {
        method: 'GET',
        url:$urlUtil.storageAPI() +'/photos'
      }
    ).then(function(response){//Success Call back
        console.log('Data from storage::' + JSON.stringify(response));
        $scope.photos = response.data;
        $ionicLoading.hide();
      }, function(err){//error call back
        console.log('Error in fetching photos::' + err);
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Photo Archive',
          template: 'Error in loading photos. Try Again later:' + JSON.stringify(err)
        });
      })

})

.controller('SettingsCtrl', function($scope, $localStorage,$ionicPopup){
  $scope.settings =$localStorage.getObject('HomeMonitorSettings');
  $scope.saveSettings= function(){
    if($scope.settings.isHttps) $scope.settings.protocol='https';
    else
      $scope.settings.protocol='http';
    $localStorage.setObject('HomeMonitorSettings',$scope.settings);
    console.log('Settings Saved Successfully');
    var alertPopup = $ionicPopup.alert({
      title: 'Save Settings',
      template: 'Settings Saved successfully!!'
    });
  }
});

