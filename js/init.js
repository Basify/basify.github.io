var arrayOfValues = new Array();

var numbers = $('.number-item');
var letters = $(".letter-item");
var zero    = $('#zero-item');
var result  = $('#result');
var cancel  = $('#cancel');

var start;
var longpress = 400;

function getParagraphTextById(id) {
  return $(id)[0].innerHTML;
}

function getStringWithoutLastChar(string) {
    return string.toString()
    			.replace(/\d{11}$/, '')
    			.split(',')
    			.join('')
    			.replace(/\s+/g, '');
}

function getConcatenatedArrayOfValues() {
	var tmpString;
	for (var i = 0; i <= arrayOfValues.length; i++) {
		tmpString.concat(arrayOfValues[i]);
	}
	return tmpString;
}

function removeLastItemFromArrayOfValues() {
	arrayOfValues.splice(-1,1);
}

function clearLastNumber() {
	removeLastItemFromArrayOfValues();
	result.text(getStringWithoutLastChar(arrayOfValues.toString()));  
}

function clearAll() {
	while(arrayOfValues.length > 0) {
    	arrayOfValues.pop();
	}
	result.text('');
}

numbers.each(function(index) {
    numbers.eq(index).click(function() {
    	arrayOfValues.push(numbers.eq(index).text());
    	var string = getParagraphTextById('#result') + numbers.eq(index).text();
		result.text(string.replace(/\s+/g, ''));
	});
});

letters.each(function(index) {
    letters.eq(index).click(function() {
    	arrayOfValues.push(letters.eq(index).text());
    	var string = getParagraphTextById('#result') + letters.eq(index).text();
		result.text(string.replace(/\s+/g, ''));
	});
});

zero.click(function() {
	arrayOfValues.push(zero.text());
	var string = getParagraphTextById('#result') + zero.text();
	result.text(string.replace(/\s+/g, ''));
});

cancel.on('mousedown', function(e) {
    start = new Date().getTime();
});

cancel.on('mouseleave', function(e) {
    start = 0;
});

cancel.on('mouseup', function(e) {
    if (new Date().getTime() >= (start + longpress)) {
        clearAll();
    } else {
        clearLastNumber();
    }
});