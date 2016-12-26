/**
 * Google Drive service.
 * Created by roman.burdakov on 12/1/15.
 */
angular.module('gDrive').service('GoogleDriveService', ['$rootScope', function($rootScope) {
  var svc = this;
  svc.documents = [];
  svc.currentFile = {};

  /**
   * List files from Google Drive.
   */
  svc.listFiles = function() {
    var request = gapi.client.drive.files.list({
      'maxResults': 10,
      'q': "mimeType = 'application/vnd.google-apps.document'"
    });

    request.execute(function(resp) {
      var files = resp.items;
      if (files && files.length > 0) {
        svc.documents = files;
      }
      $rootScope.$apply();
    });
  };

  /**
   * Load a file from google drive for a given id.
   * @param fileId file id.
   * @param callback need for testing.
   */
  svc.loadFile = function(fileId, callback) {
    if (fileId && gapi && gapi.client.drive) {
      var request = gapi.client.drive.files.get({fileId: fileId});

      request.execute(function(resp) {
        var accessToken = gapi.auth.getToken().access_token;

        $.ajax({
          url: resp.exportLinks["text/plain"],
          type: "GET",
          beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', "Bearer "+accessToken);
          },
          success: function( data ) {
            svc.currentFile = data;
            $rootScope.$apply();
            if(callback){
              callback();
            }
          }
        });
      });
    }
  };
}]);