// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('rvhHome', ['ionic', 'rvhHome.controllers', 'rvhHome.services'])

.run(function($ionicPlatform,$localStorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //Set default App settings
    var settings={};
    settings.ipAddress='52.10.43.41';
    settings.protocol='http';
    settings.isHttps=false;
    settings.port=8080;
    settings.storagePath='/api/aws/s3';
    settings.publishPath='/api/aws/sqs/publish';
    $localStorage.setObject('HomeMonitorSettings', settings);

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.gallery', {
    url: '/gallery',
    views: {
      'menuContent': {
        templateUrl: 'templates/photoArchive.html',
        controller:'PhotoArchiveCtrl'
      }
    }
  })

  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })

    .state('app.device', {
      url: '/device',
      views: {
        'menuContent': {
          templateUrl: 'templates/device.html',
          controller: 'DeviceCtrl'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/about');
});

