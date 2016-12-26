describe('TranslatorService', function(){
  var translatorService, $httpBackend;
  var mockMsg = "Unit Testing";
  var translationResult = "rrrrRrnrrRrt TrrstrrRrng";

  beforeEach(function() {
    //angular.mock.module
    module('gDrive');

    inject(function($injector){
      translatorService = $injector.get('TranslatorService');
      $httpBackend = $injector.get('$httpBackend');
    });
    $httpBackend
        .when('GET', 'http://ancient-anchorage-9224.herokuapp.com/zombify')
        .respond(200, translationResult);
  });

  it("should be translating into zomby language", function(){
    translatorService.translate(mockMsg, function(translationResult) {
      expect(translationResult).toBe(mockMsg);
    });
  });
});
