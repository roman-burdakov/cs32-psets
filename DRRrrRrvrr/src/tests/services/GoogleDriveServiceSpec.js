describe('GoogleDriveService', function() {
  var googleDriveService, $httpBackend;
  var documentURL = 'https://content.googleapis.com/drive/v2/files';
  var fileListMock = [
    {
      id: 'qwerty',
      name: 'Assignment 01',
      text: 'Submitted!'
    },
    {
      id: 'asdfg',
      name: 'Assignment 02',
      text: 'Submitted!!'
    },
    {
      id: 'zxcvb',
      name: 'Assignment 03',
      text: 'Submitted!!!'
    }
  ];

  beforeEach(function() {
    //angular.mock.module
    module('gDrive');

    inject(function($injector) {
      googleDriveService = $injector.get('GoogleDriveService');
      $httpBackend = $injector.get('$httpBackend');

      var window = $injector.get('$window');
      window.gapi = {
        auth: {
          getToken: function() {
            return {
              access_token: 'Bearer ya29.RQJx4v1DwtC2ae-sOB4mNQbp8hXt_c1GY2B1-ZDgEgpDcDDuClDswi-mldqlluOmHaYaXg'
            };
          }
        },
        client: {
          drive: {
            files: {
              list: function() {
                return {
                  execute: function(callback) {
                    callback({ items: fileListMock });
                  }
                };
              },

              get: function() {
                return {
                  execute: function(callback) {
                    callback({
                      exportLinks: {
                        'text/plain': documentURL
                      }
                    });
                  }
                };
              }
            }
          }
        }
      };
    });
  });

  describe('google drive access to all files', function() {
    it('should load files', function() {
      expect(googleDriveService.documents).toEqual([]);
      googleDriveService.listFiles();
      expect(googleDriveService.documents).toEqual(fileListMock);
    });
  });

  describe('google drive access for a specific file', function() {
    it('should return file for a given id.', function() {
      var docId = 'qwerty';
      var text = 'Assignment 01';
      $httpBackend.when('GET', documentURL).respond(200, text);

      spyOn(gapi.client.drive.files, 'get').and.callThrough();
      spyOn(gapi.auth, 'getToken').and.callThrough();
      expect(googleDriveService.currentFile).toEqual({});

      googleDriveService.loadFile(docId, function() {
        expect(gapi.client.drive.files.get).toHaveBeenCalledWith({fileId: docId});
        expect(gapi.auth.getToken).toHaveBeenCalled();
        expect(googleDriveService.current).toBe(text);
      });
    });
  });
});