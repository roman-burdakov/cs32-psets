Google DRRrrRrvrr
====

This service provides translation of your documents to a simplified zomby-like language :).

### Installation

* create file GoogleApiCredentials.js in src/js/services/ folder with following content:<br>
  `angular.module('gDrive')
       .value('CLIENT_ID', '<YOUR_GOOGLE_DRIVE_CLIENT_ID>')
       .value('SCOPES', ['<SCOPES>']);`<br>
  with <B>your</B> google drive client id and scopes. More info about how to obtain it can be found 
  <a href="https://developers.google.com/drive/web/quickstart/js">here</a><br><br>
  NB: <b>this app won't work if you won't add this file.</b><br> Sorry but I'm not adding my own google drive credentials.
* `npm install`
* `bower install`

### Running

* By means of running `gulp` you can perform following steps:
  * build and package entire project
  * execute tests
  * start application server that would be hosting service on http://localhost:8080
  * watch for file changes and perform live updates without server restart.

You can always run test separately:
 * `karma start && karma run`

## NB:

* In might take a while to load relatively large documents. Our translation service is still in beta version! :)
* <b>Some translation might not be performed in the current version since external translation service doesn't accept 
POST requests for large translation leaving us with limitations of the GET request for query arguments.</b>