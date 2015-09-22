var arrayOfValues = new Array();

var numbers = $('.number-item');
var letters = $(".letter-item");
var result = $('#result');
var cancel = $('#cancel');

function getParagraphTextById(id) {
  return $(id)[0].innerHTML;
}

function getLastChar(string) {
    return string.toString().replace(/\d{11}$/, '').slice(0, -1);
}

/*
 * Work in progress
 */
function getConcatenatedArrayOfValues() {
	var tmpString;
	for (var i = 0; i < arrayOfValues.length; i++) {
		tmpString.concat(arrayOfValues[i]);
	}
	return tmpString.replace(",", "").replace(" ", "");
}

function removeLastItemFromArrayOfValues() {
	arrayOfValues.splice(-2,1);
}

numbers.each(function(index) {
    numbers.eq(index).click(function() {
    	arrayOfValues.push(numbers.eq(index).text());
		result.text(getParagraphTextById('#result') + numbers.eq(index).text());
	});
});

letters.each(function(index) {
    letters.eq(index).click(function() {
    	arrayOfValues.push(letters.eq(index).text());
		result.text(getParagraphTextById('#result') + letters.eq(index).text());
	});
});

cancel.click(function() {
	removeLastItemFromArrayOfValues();
	result.text(getLastChar(arrayOfValues.toString()));
});