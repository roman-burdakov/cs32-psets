define(['TranslatorService'], function(TranslatorService){
  var translator = new TranslatorService();
  describe('English to Zombie translation', function() {

    describe('...single rules:', function() {
      it('1. lower-case "r" at the end of words replaced with "rh"', function(){
        expect(translator.zombify("tr")).toBe("trh");
        expect(translator.zombify("TR")).not.toBe("Trh");
        expect(translator.zombify("TR")).toEqual("TR");
        expect(translator.zombify("tt tr")).toEqual("tt trh");
        expect(translator.zombify("r")).toMatch(/rh/g);
      });

      it('2. "r" or "R" is replaced by "RR"', function(){
        expect(translator.zombify("tRt")).toBe("tRRt");
        expect(translator.zombify("rrt")).toEqual("RRRRt");
        expect(translator.zombify("rr")).toMatch(/RRrh/g);
      });

      it('3. an "a" or "A" is replaced by "hra".', function() {
        expect(translator.zombify("appl")).toBe("hrappl");
        expect(translator.zombify("AAA")).toEqual("hrahrahra");
        expect(translator.zombify("a")).toMatch(/hra/g);
      });

      it('4. "e" or "E" is replaced by "rr"', function() {
        expect(translator.zombify("eb")).toBe("rrb");
        expect(translator.zombify("Ember.js")).toEqual("rrmbrrRR.js");
        expect(translator.zombify("e")).toMatch(/rr/g);
      });

      it('5. "i" or "I" is replaced by "rrRr"', function() {
        expect(translator.zombify("ip")).toBe("rrRrp");
        expect(translator.zombify("PI")).toEqual("PrrRr");
        expect(translator.zombify("i")).toMatch(/rrRr/g);
      });

      it('6. "o" or "O" is replaced by "rrrRr"', function() {
        expect(translator.zombify("oops")).toBe("rrrRrrrrRrps");
        expect(translator.zombify("PO BOX")).toEqual("PrrrRr BrrrRrX");
        expect(translator.zombify("o")).toMatch(/rrrRr/g);
      });

      it('7. "u" or "U" is replaced by "rrrrRr"', function() {
        expect(translator.zombify("up")).toBe("rrrrRrp");
        expect(translator.zombify("UP UP")).toEqual("rrrrRrP rrrrRrP");
        expect(translator.zombify("u")).toMatch(/rrrrRr/g);
      });

      it('8. Custom rule - replace "ei", "Ei", "EI" "eI" with "rhrRr"', function() {
        expect(translator.zombify("being")).toBe("brhrRrng");
        expect(translator.zombify("BEING")).toEqual("BrhrRrNG");
        expect(translator.zombify("ei")).toMatch(/rhrRr/g);
      });

      it('9. Custom rule - replace "y" or "Y" with "hh"', function() {
        expect(translator.zombify("why")).toBe("whhh");
        expect(translator.zombify("YSS")).toEqual("hhSS");
        expect(translator.zombify("y")).toMatch(/hh/g);
      });

      it('10. the starts of sentences are capitalised (the "start of a sentence" is any' +
          ' occurrence of ".!?", followed by a space, followed by a letter.)', function() {
        expect(translator.zombify("bl bl bl")).toBe("bl bl bl");
        expect(translator.zombify("bl bl bl!")).toEqual("Bl bl bl!");
        expect(translator.zombify("bl bl bl?")).toBe("Bl bl bl?");
        expect(translator.zombify("bl bl bl.")).toEqual("Bl bl bl.");
        expect(translator.zombify("bl!")).toMatch(/Bl!/g);
      });
    });

    describe('...words and full sentences', function() {
      it('"onomatopoeia" translated to "rrrRrnrrrRrmhratrrrRrprrrRrrhrRrhra"', function() {
        expect(translator.zombify('onomatopoeia')).toBe("rrrRrnrrrRrmhratrrrRrprrrRrrhrRrhra");
      });

      it('"being and bung" translated to "brhrRrng hrand brrrrRrng"', function() {
        expect(translator.zombify('being and bung')).toBe("brhrRrng hrand brrrrRrng");
      });

      it('"Where is restroom?" translated to "WhrrRRrr rrRrs RRrrstRRrrrRrrrrRrm?"', function(){
        expect(translator.zombify("Where is restroom?")).toBe("WhrrRRrr rrRrs RRrrstRRrrrRrrrrRrm?");
      });

      it('"Lorem ipsum dolor sit amet, consectetur adipiscing elit." translated to ' +
          '"LrrrRrRRrrm rrRrpsrrrrRrm drrrRrlrrrRrrh srrRrt hramrrt, crrrRrnsrrctrrtrrrrRrrh hradrrRrprrRrscrrRrng rrlrrRrt."', function(){
        expect(translator.zombify("Lorem ipsum dolor sit amet, consectetur adipiscing elit."))
            .toBe("LrrrRrRRrrm rrRrpsrrrrRrm drrrRrlrrrRrrh srrRrt hramrrt, crrrRrnsrrctrrtrrrrRrrh hradrrRrprrRrscrrRrng rrlrrRrt.");
      });
    });
  });

  describe('Zombie to English translation', function() {

    describe('...single rules:', function() {
      it('1. lower-case "rh" at the end of words replaced with "r"', function(){
        expect(translator.unzombify("rh")).toMatch(/r/g);
        expect(translator.unzombify("trh")).toEqual("tr");
        expect(translator.unzombify("tRRrh ")).toEqual("trr ");
        expect(translator.unzombify("tt trh")).toEqual("tt tr");
      });

      it('2. "RR" is replaced by "r"', function(){
        expect(translator.unzombify("RR")).toMatch(/r/g);
        expect(translator.unzombify("tRRt")).toBe("trt");
        expect(translator.unzombify("RRRRt")).toEqual("rrt");
      });

      it('3. "hra" is replaced by "a".', function() {
        expect(translator.unzombify("hra")).toMatch(/a/g);
        expect(translator.unzombify("hrappl")).toBe("appl");
        expect(translator.unzombify("hrahrahra")).toEqual("aaa");
      });

      it('4. "rr" is replaced by "e"', function() {
        expect(translator.unzombify("rr")).toMatch(/e/g);
        expect(translator.unzombify("rrb")).toBe("eb");
        expect(translator.unzombify("rrmbrrRR.js")).toEqual("ember.js");
      });

      it('5. "rrRr" is replaced by "i"', function() {
        expect(translator.unzombify("rrRr")).toMatch(/i/g);
        expect(translator.unzombify("rrRrp")).toBe("ip");
        expect(translator.unzombify("PrrRr")).toEqual("Pi");
      });

      it('6. "rrrRr" is replaced by "o"', function() {
        expect(translator.unzombify("rrrRr")).toMatch(/o/g);
        expect(translator.unzombify("rrrRrrrrRrps")).toBe("oops");
        expect(translator.unzombify("PrrrRr BrrrRrX")).toEqual("Po BoX");
      });

      it('7. "rrrrRr" is replaced by "u"', function() {
        expect(translator.unzombify("rrrrRr")).toMatch(/u/g);
        expect(translator.unzombify("rrrrRrp")).toBe("up");
        expect(translator.unzombify("rrrrRrP rrrrRrP")).toEqual("uP uP");
      });

      it('8. Custom rule - replace "rhrRr" replaced by "ei"', function() {
        expect(translator.unzombify("rhrRr")).toMatch(/ei/g);
        expect(translator.unzombify("brhrRrng")).toBe("being");
        expect(translator.unzombify("BrhrRrNG")).toEqual("BeiNG");
      });

      it('9. Custom rule - replace "hh" with "y"', function() {
        expect(translator.unzombify("hh")).toMatch(/y/g);
        expect(translator.unzombify("trhh")).toBe("try");
        expect(translator.unzombify("hhSS")).toEqual("ySS");
      });

      it('10. the starts of sentences are capitalised (the "start of a sentence" is any' +
          ' occurrence of ".!?", followed by a space, followed by a letter.)', function() {
        expect(translator.unzombify("bl bl bl")).toBe("bl bl bl");
        expect(translator.unzombify("bl bl bl!")).toEqual("Bl bl bl!");
        expect(translator.unzombify("bl bl bl?")).toBe("Bl bl bl?");
        expect(translator.unzombify("bl bl bl.")).toEqual("Bl bl bl.");
        expect(translator.unzombify("bl.")).toMatch(/Bl./g);
      });
    });

    describe('...words and full sentences', function() {
      it('"rrrRrnrrrRrmhratrrrRrprrrRrrhrRrhra" translated to "onomatopoeia"', function() {
        expect(translator.unzombify('rrrRrnrrrRrmhratrrrRrprrrRrrhrRrhra')).toBe("onomatopoeia");
      });

      it('"brhrRrng hrand brrrrRrng" translated to "being and bung"', function() {
        expect(translator.unzombify('brhrRrng hrand brrrrRrng')).toBe("being and bung");
      });

      it('"WhrrRRrr rrRrs RRrrstRRrrrRrrrrRrm?" translated to "Where is restroom?"', function(){
        expect(translator.unzombify("WhrrRRrr rrRrs RRrrstRRrrrRrrrrRrm?")).toBe("Where is restroom?");
      });

      it('"ZrrrRrmbrrRrrr rrhrat bRRhrarrRrns frrrRrrh bRRrrhrakfhrast"' +
          ' translated to "Zombie eat brains for breakfast"', function(){
        expect(translator.unzombify("ZrrrRrmbrrRrrr rrhrat bRRhrarrRrns frrrRrrh bRRrrhrakfhrast"))
            .toBe("Zombie eat brains for breakfast");
      });
    });
  });

});