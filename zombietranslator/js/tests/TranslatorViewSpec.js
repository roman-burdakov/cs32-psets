define(['jquery', 'TranslatorView'], function($, TranslatorView){
  var translatorView;
  var event = jQuery.Event("keyup", { keyCode: 64 });
  // beforeEach happens before each it() executes
  beforeEach(function () {
    translatorView = new TranslatorView({
      humanInputEl: $('<textarea id="english"/>'),
      zombieInputEl: $('<textarea id="zombie"/>')
    });
  });

  describe('English to Zombie translation:', function() {
    it('should call translatorView.zombify', function(){
      spyOn(translatorView.translator, "zombify");
      // Create a new jQuery.Event object with specified event properties.
      translatorView.$humanInputEl.val('hi');
      // trigger an artificial keyup event with keyCode 64
      translatorView.$humanInputEl.trigger(event);
      expect(translatorView.translator.zombify).toHaveBeenCalled();
    });

    it('translation event should not wipe out input', function(){
      translatorView.$humanInputEl.val("hi");
      translatorView.$humanInputEl.trigger(event);
      expect(translatorView.$humanInputEl.val()).toBe('hi');
    });

    it('result of translation should appear in the other text area', function(){
      translatorView.$humanInputEl.val('hi');
      // trigger an artificial keyup event with keyCode 64
      translatorView.$humanInputEl.trigger(event);
      expect(translatorView.$zombieInputEl.val()).toMatch(/hrrRr/g);
    });
  });

  describe('Zombie to English translation:', function() {
    it('should call translatorView.unzombify', function(){
      spyOn(translatorView.translator, "unzombify");
      // Create a new jQuery.Event object with specified event properties.
      translatorView.$zombieInputEl.val('hrrRr');
      // trigger an artificial keyup event with keyCode 64
      translatorView.$zombieInputEl.trigger(event);
      expect(translatorView.translator.unzombify).toHaveBeenCalled();
    });

    it('translation event should not wipe out input', function(){
      translatorView.$zombieInputEl.val("hrrRr");
      translatorView.$zombieInputEl.trigger(event);
      expect(translatorView.$zombieInputEl.val()).toBe('hrrRr');
    });

    it('result of translation should appear in the other text area', function(){
      translatorView.$zombieInputEl.val('hrrRr');
      // trigger an artificial keyup event with keyCode 64
      translatorView.$zombieInputEl.trigger(event);
      expect(translatorView.$humanInputEl.val()).toMatch(/hi/g);
    });
  });
});