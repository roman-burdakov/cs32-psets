*TranslateAPI*

NodeJS server app that provides API for translation service
(https://github.com/roman-burdakov/zombietranslator)

## Installation && Running
1. `npm install`
2. `npm start`

## Usage

* Open browser and navigate to http://localhost:3000/. It has instructions ho to use API.

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
