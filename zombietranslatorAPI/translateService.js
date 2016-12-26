/**
 * Translation Service
 * Created by roman.burdakov@hbsp.harvard.edu on 9/23/15.
 */
define([], function(){

  /**
   * Translation rules.
   * 1. lower-case "r" at the end of words replaced with "rh".
   * 2. "r" or "R' is replaced by "RR".
   * 3. an "a" or "A" is replaced by "hra".
   * 4. "e" or "E" is replaced by "rr"
   * 5. "i" or "I" is replaced by "rrRr"
   * 6. "o" or "O" is replaced by "rrrRr"
   * 7. "u" or "U" is replaced by "rrrrRr"
   * 8. Custom rule - replace "ei", "Ei", "EI" "eI" with "rhrRr"
   * 9. Custom rule - replace "y" or "Y" with "hh"
   * 10. the starts of sentences are capitalised (the "start of a sentence" is any occurrence of
   * ".!?", followed by a space, followed by a letter.)
   * @constructor
   */
  var TranslatorService = function(){
    // default constructor for init.
  };

  /**
   * Translates sentences from english to zombie using translation rules:
   * @param input
   */
  TranslatorService.prototype.zombify = function(input){
    var result = input
        .replace(/[Rr](?!\s|$)/g, "RR")
        .replace(/(.*?)r(\s|$)/g, "$1rh$2")
        .replace(/[Aa]/g, "hra")
        .replace(/(ei)|(Ei)|(EI)|(eI)/g, "rhrRr")
        .replace(/[Ee]/g, "rr")
        .replace(/[iI]/g, "rrRr")
        .replace(/[Oo]/g, "rrrRr")
        .replace(/[Uu]/g, "rrrrRr")
        .replace(/[yY]/g, "hh");
    return applySentenceCase(result);
  };

  /**
   * Translates zombie sentences to english using translation rules.
   * @param input
   */
  TranslatorService.prototype.unzombify = function(input){
    var result = input
        .replace(/(.*?)rh(\s|$)/g, "$1r$2")
        .replace(/RR/g, "|r|")// <-- temporary isolate 'r'
        .replace(/hra/g, "a")
        .replace(/rhrRr/g,"ei")
        .replace(/rrrRrrrrRr/g, "oo") // <-- rrrRrrrrRr -- 'oo' not 'erRu'!
        .replace(/rrrrRr/g, "u")
        .replace(/rrrRr/g, "o")
        .replace(/rrRr/g, "i")
        .replace(/rr/g, "e")
        .replace(/hh/g, "y")
        .replace(/\|r\|/g, "r"); // <-- put 'r' back;
    return applySentenceCase(result);
  };

  /**
   * Help function to apply upper case for the first word of the sentence if
   * it ends with '?', '!', '.' followed by space
   * @param str - the input string to be sentence corrected.
   * @returns {string} - returns result where first letter of every sentence is capitalized.
   */
  function applySentenceCase(str) {
    return str.replace(/.+?[.?!](\s|$)/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
  }

  exports.unzombify = TranslatorService.prototype.unzombify;
  exports.zombify = TranslatorService.prototype.zombify;

  // return TranslatorService;
});
