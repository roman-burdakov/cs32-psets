*The end is nigh!*

But we can prepare. In this assignment we will begin preparing for the end by creating a simple zombie translator. This can be used by the living for either concealment or bartering and the living impaired will have an easier time asking for brains. 

The translator can be done as a series of regular expressions (Links to an external site.) or you can step through it character by character. You get a string and you transform that string. 

## Translation Rules

1. lower-case "r" at the end of words replaced with "rh".
2. "r" or "R' is replaced by "RR".
3. an "a" or "A" is replaced by "hra".
4. "e" or "E" is replaced by "rr"
5. "i" or "I" is replaced by "rrRr"
6. "o" or "O" is replaced by "rrrRr"
7. "u" or "U" is replaced by "rrrrRr"
8. *Custom rule - replace "ei", "Ei", "EI" "eI" with "rhrRr"*
9. *Custom rule - replace "y" or "Y" with "hh"*
10. the starts of sentences are capitalised (the "start of a sentence" is any occurrence of
".!?", followed by a space, followed by a letter.)

## Expects to be used for testing:

1. expect(...).toBe("...") I.e.:
  expect(translator.zombify("tr")).toBe("trh");
2. expect(...).toEqual("...") Similar to previous. I.e.:
  expect(translator.zombify("TR")).toEqual("TR");
3. expect(...).not.toBe("...") .Opposite of first rule. I.e.:
  expect(...).not.toBe("...");
4. expect(...).toMatch(/.../) to validate regexp used in rule. I.e.:
  expect(translatorView.$zombieInputEl.val()).toMatch(/hrrRr/g);
5. expect(...).toHaveBeenCalled() to validate that specific call was made while spying on the given instance. I.e.:
  spyOn(translatorView.translator, "zombify");
  ... // trigger event
  expect(translatorView.translator.zombify).toHaveBeenCalled();
  