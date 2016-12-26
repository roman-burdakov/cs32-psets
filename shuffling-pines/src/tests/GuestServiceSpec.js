describe('GuestService', function(){
  var guestService, $httpBackend;
  var guestsMock = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "action": "pick-up",
      "email": "Sincere@april.biz",
      "transitionDate": "2012-04-23T18:25:43.511Z",
      "deleted": false,
      "location": "12 Bennett Str, Brighton MA 02135",
      "phone": "1-770-736-8031"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "action": "drop-off",
      "email": "Shanna@melissa.tv",
      "transitionDate": "2014-04-23T18:25:43.511Z",
      "deleted": false,
      "location": "9 Patten Str, Watertonw MA 02472",
      "phone": "010-692-6593"
    }
  ];

  //angular.mock.module
  beforeEach(function(){
    module('shuffling');
    inject(function($injector){
      guestService = $injector.get('GuestService');
      $httpBackend = $injector.get('$httpBackend');
    });
    $httpBackend
        .when('GET', 'js/users.json')
        .respond(200, guestsMock);
  });

  it('should load some guests on init if localStorage is empty', function(){
    localStorage.clear();
    expect(guestService.guests.length).toBe(2);
  });

  it('should add a new guest', function(){
    var guestCount = guestService.guests.length;
    guestService.add({
      name:'David Spade',
      phone: '617-617-5555',
      transitionDate:new Date(),
      action:'pick-up',
      pickupLocation:'1 Pleasant Str, Boston'
    });
    expect(guestService.guests.length).toBe(guestCount+1);
  });

  it('should mark guest as removed, but do not physically remove the record', function(){
    var guestCount = guestService.guests.length;
    guestService.delete(0);
    expect(guestService.guests.length).toBe(guestCount);
    expect(guestService.guests[0].deleted).toBeTruthy();
  });

  it('should be able to change status of the guest', function(){
    var before = guestService.guests[0].action;
    var after = 'lorem ipsum...';
    guestService.update('action', after, 0);
    expect(guestService.guests[0].action).toBe(after);
    expect(guestService.guests[0].action).not.toBe(before);
  });

});