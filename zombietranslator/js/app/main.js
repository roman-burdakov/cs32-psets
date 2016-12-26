/**
 * TranslatorApp
 * Created by roman.burdakov on 9/23/15.
 */
require(['jquery', 'TranslatorView'], function($, TranslatorView){
  $(function(){
    var translator = new TranslatorView({humanInputEl: $('#english'), zombieInputEl: $('#zombie')});
  });
});