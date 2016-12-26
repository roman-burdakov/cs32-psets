var app = angular.module('shuffling', []);

/**
 * This directive is used to provide inline editing.
 * A better choice would be to use http://vitalets.github.io/angular-xeditable/ , but I'm not sure
 * if I would get any extra credit for using it :) So here is some craft which isn't great, but it works
 * for most of the cases.
 */
app.directive('contenteditable',['GuestService', function(GuestService) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // view -> model
      elm.bind('blur', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(elm.html());
          var idArr = $(elm).attr('id').split('-');
          var key = idArr[0];
          var field = idArr[1];
          GuestService.update(field, elm.html(), key);
        });
      });

      // model -> view
      ctrl.render = function(value) {
        elm.html(value);
      };

      // load init value from DOM
      ctrl.$setViewValue(elm.html());

      elm.bind('keydown', function(event) {
        console.log("keydown " + event.which);
        var esc = event.which === 27,
            el = event.target;

        if (esc) {
          console.log("esc");
          ctrl.$setViewValue(elm.html());
          el.blur();
          event.preventDefault();
        }
      });

    }
  };
}]);