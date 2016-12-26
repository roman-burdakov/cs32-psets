/**
 * Translator Service
 * Created by roman.burdakov on 12/1/15.
 */
angular.module('gDrive').service('TranslatorService', ['$http', function($http) {
  var svc = this;
  var translateUri = 'http://ancient-anchorage-9224.herokuapp.com/zombify';
  svc.translatedText = '';

  /**
   * Translate function.
   * @param text to be translated
   * @param callback needed for testing.
   */
  svc.translate = function(text, callback) {
    if (typeof text === 'string') {
      if (text.length <= 8190) {
        $http.get(translateUri, {
          params: {
            q: text
          }
        }).then(function (response) {
          svc.translatedText = response.data.message;
          if (callback) {
            callback(svc.translatedText);
          }
        });
      } else {
        svc.translatedText = "Can not successfully translate this document. Try different one";
      }
    }
  };

}]);