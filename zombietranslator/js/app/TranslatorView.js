/**
 * Translator View.
 * Created by roman.burdakov@hbsp.harvard.edu on 9/23/15.
 */
define(['jquery', 'TranslatorService'], function($, TranslatorService){

  var TranslatorView = function(config) {
    var self = this;
    this.translator = new TranslatorService();
    this.config = config || {};
    this.$zombieInputEl = this.config.zombieInputEl || $('#zombie');
    this.$humanInputEl = this.config.humanInputEl || $('#english');

    this.$humanInputEl.on("keyup", function() {
      self.zombify()
    });
    this.$zombieInputEl.on("keyup", function() {
      self.unzombify()
    });
  };

  TranslatorView.prototype.zombify = function() {
    var input = this.$humanInputEl.val();
    var result = this.translator.zombify(input);
    this.$zombieInputEl.val(result);
  };

  TranslatorView.prototype.unzombify = function() {
    var input = this.$zombieInputEl.val();
    var result = this.translator.unzombify(input);
    this.$humanInputEl.val(result);
  };

  return TranslatorView;
});