angular.module('rvhHome.services', [])

  .factory('$localStorage', ['$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      },
      remove: function (key){
        $window.localStorage.removeItem(key);
      }
    }
  }])

  .factory('$urlUtil', ['$localStorage', function($localStorage) {
    var settings= $localStorage.getObject('HomeMonitorSettings');
    return {
      storageAPI: function(){
        var url=settings.protocol+'://'+settings.ipAddress +':'+settings.port + settings.storagePath;
        return url;

      },
      publishAPI: function(){
        var url=settings.protocol+'://'+settings.ipAddress +':'+settings.port + settings.publishPath;
        return url;
      }
    }
  }])

.factory('$Util', function(){
    return{
      isEmpty: function(obj){
        var field;
        for(field in obj){
          if(obj.hasOwnProperty(field))
            return false;
        }
        return true;
      }
    }
});
