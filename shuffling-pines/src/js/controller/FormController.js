angular.module('shuffling').controller('FormController', ['$sce', 'GuestService', 'TabService', '$window',
    function($sce, GuestService, TabService, $window){
  var vm = this;
  vm.guestService = GuestService;
  vm.tabService = TabService;
  // next id.
  vm.id = 4;
  vm.player = $sce.trustAsHtml('<iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d23584.515902079613!2d-71.11043947007822!3d42.362464917935924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x89e3709dbc6e232b%3A0x3f8683fc7ba94f04!2sBoston+Common%2C+Tremont+Street%2C+Boston%2C+MA!3m2!1d42.3551128!2d-71.0655822!4m5!1s0x89e377683caca849%3A0x1c3c07d4e74131fd!2s1+Story+St%2C+Cambridge%2C+MA+02138!3m2!1d42.3741318!2d-71.12182969999999!5e0!3m2!1sen!2sus!4v1450061349217" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>');

  vm.register = function() {
    vm.guestService.add({
      id: vm.id,
      name: vm.name,
      phone: vm.phone,
      transitionDate: vm.transitionDate,
      entryDate: new Date(),
      action: vm.action,
      pickupLocation: vm.location,
      deleted: false
    });
    vm.id++;
    vm.clearInputs();
    // switch to the registered guest info tab
    vm.tabService.setCurrentTab(2);
  };

  vm.clearInputs = function() {
    delete vm.name;
    delete vm.phone;
    delete vm.transitionDate;
    delete vm.entryDate;
    delete vm.action;
    delete vm.location;
  };

  vm.hasGuestInfo = function() {
    return vm.name || vm.phone || vm.transitionDate || vm.action || vm.location;
  };

  vm.changeStatus = function(key) {
    var guest = vm.guestService.getGuest(key);
    if (guest.action === 'pick-up' || guest.action === 'drop-off') {
      vm.guestService.update('action', 'arrived', key);
    } else if (guest.action === 'arrived') {
      vm.guestService.update('action', 'pick-up', key);
    }
  };

  vm.getGuests = function() {
    console.log("total guests including removed: " + vm.guestService.getAll().length);
    return vm.guestService.getAll();
  };

  vm.delete = function(key) {
    var guest = vm.guestService.getGuest(key);
    if ($window.confirm('Remove ' + guest.name + '?')) {
      vm.guestService.delete(key);
    }
  };
}]);
