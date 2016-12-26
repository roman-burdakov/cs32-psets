angular.module('shuffling').service('GuestService', [function() {
  var svc = this;
  svc.guests = JSON.parse(localStorage.getItem('guests')) || []; // initialize guest list

  svc.init = function() {
    var self = this;
    $.getJSON('js/users.json', function(data) {
      var json = JSON.stringify(data);
      console.log("in init for guest load: " + json);
      self.guests = JSON.parse(json);
      console.log(JSON.parse(localStorage.getItem('guests')));
    });
  };

  svc.add = function(guest) {
    svc.guests.push(guest);
    localStorage.setItem('guests', JSON.stringify(svc.guests));
    console.log(JSON.parse(localStorage.getItem('guests')));
  };

  svc.getAll = function() {
    return svc.guests;
  };

  svc.getGuest = function(key) {
    return svc.guests[key];
  };

  svc.update = function(fieldname, value, key) {
    // update guest in local storage
    svc.guests[key][fieldname] = value;
    localStorage.setItem('guests', JSON.stringify(svc.guests));
    console.log(JSON.parse(localStorage.getItem('guests')));
  };

  svc.delete = function(key) {
    console.log('in delete key:' + key);
    // set deleted flag for guest in local storage
    svc.guests[key].deleted = 1; // logical delete
    localStorage.setItem('guests', JSON.stringify(svc.guests));
    console.log(JSON.parse(localStorage.getItem('guests')));
  };

  if (svc.guests.length === 0) {
    // initialize with example data
    svc.init();
  }

}]);