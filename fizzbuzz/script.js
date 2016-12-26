$(function() {
  fizzBuzzRun();
  $('#run').click(fizzBuzzRun);
});

var fizzBuzzRun = function() {
  var start = parseInt($('#start').val());
  var end = parseInt($('#end').val());
  var step = parseInt($('#step').val());
  fizzBuzz(start, end, step);
}

var fizzBuzz = function(start, end, step) {
	var text;
	for (var i=start; i<end; i+=step) {
		text = "";
	  	if (i % 3 == 0) {
	  		text+='Fizz';
	  	} 
	  	if (i % 5 == 0) {
			text+='Buzz';
	  	} 
	  	if (i==0 || ((i % 3)&&(i % 5) != 0)) {
	  		text=i;
	  	} 
	  	console.log(text);
	}
}
