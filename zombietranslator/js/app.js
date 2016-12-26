/**
 * Created by roman.burdakov on 9/23/15.
 */
requirejs.config({
  "baseUrl": "js/app",
  "paths": {
    "jquery": "../vendors/jquery.min",
    "bootstrap": "../vendors/bootstrap.min"
  },
  "shim": {
    "bootstrap": ["jquery"]
  }
});

require(['main']);
