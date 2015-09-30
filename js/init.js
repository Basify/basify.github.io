var arrayOfValues = new Array();

var numbers        = $('.number-item');
var letters        = $('.letter-item');
var zero           = $('#zero-item');
var result         = $('#result');
var cancel         = $('#cancel');
var output         = $('#output');
var lettersDiv     = $('#hex-letters');
var lettersOverlay = $('#hex-letters-overlay');
var conversion     = $('#conversion-type');

var conversionType = getParagraphTextById(conversion);

var start;
var longpress = 400;

var HEXADECIMAL = 'HEX';
var DECIMAL     = 'DEC';
var OCTAL       = 'OCT';
var BINARY      = 'BIN';

var hex, dec, oct, bin;

var debug = true;

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
	for (var i = 0; i < arrayOfValues.length; i++) {
		tmpString.concat(arrayOfValues[i]);
	}
	return tmpString;
}

function removeLastItemFromArrayOfValues() {
	arrayOfValues.splice(-1, 1);
}

function clearLastNumber() {
	removeLastItemFromArrayOfValues();
  var string = getStringWithoutLastChar(arrayOfValues.toString());
  if (string != '') {
	   result.text(string);
     calculate();
  } else {
    result.text('');
    output.text('');
  }
}

function clearAll() {
	while(arrayOfValues.length > 0) {
    	arrayOfValues.pop();
	}
	result.text('');
  output.text('');
}

function calculateFromHex(input) {
  hex = parseInt(input).toString().toUpperCase();
  dec = parseInt(input, 16).toString(10).toUpperCase();
  oct = parseInt(input, 16).toString(8).toUpperCase();
  bin = parseInt(input, 16).toString(2).toUpperCase();
}

function calculateFromDec(input) {
  hex = parseInt(input, 10).toString(16).toUpperCase();
  dec = parseInt(input, 10).toString().toUpperCase();
  oct = parseInt(input, 10).toString(8).toUpperCase();
  bin = parseInt(input, 10).toString(2).toUpperCase();
}

function calculateFromOct(input) {
  hex = parseInt(input, 8).toString(16).toUpperCase();
  dec = parseInt(input, 8).toString(10).toUpperCase();
  oct = parseInt(input).toString().toUpperCase();
  bin = parseInt(input, 8).toString().toUpperCase();
}

function calculateFromBin(input) {
  hex = parseInt(input, 2).toString(16).toUpperCase();
  dec = parseInt(input, 2).toString(10).toUpperCase();
  oct = parseInt(input, 2).toString(8).toUpperCase();
  bin = parseInt(input).toString().toUpperCase();
}

function changeConversion(input) {
  if (conversionType == HEXADECIMAL) {
    conversionType = DECIMAL;
    calculateFromDec(input);
  } else if (conversionType == DECIMAL) {
    conversionType = OCTAL;
    calculateFromOct(input);
  } else if (conversionType == OCTAL) {
    conversionType = BINARY;
    calculateFromBin(input);
  } else if (conversionType == BINARY) {
    conversionType = HEXADECIMAL;
    calculateFromHex(input);
  }
}

function calculate(mustChangeConversion) {
  var input = result.text();

  if (mustChangeConversion)
    changeConversion(input);
  else {
    if (conversionType == HEXADECIMAL) {
      calculateFromHex(input);
    } else if (conversionType == DECIMAL) {
      calculateFromDec(input);
    } else if (conversionType == OCTAL) {
      calculateFromOct(input);
    } else if (conversionType == BINARY) {
      calculateFromBin(input);
    }
  }

  output.text((hex != NaN && conversionType != HEXADECIMAL ? ' | ' + 'HEX: ' + hex : '') +
              (dec != NaN && conversionType != DECIMAL     ? ' | ' + 'DEC: ' + dec : '') +
              (oct != NaN && conversionType != OCTAL       ? ' | ' + 'OCT: ' + hex : '') +
              (bin != NaN && conversionType != BINARY      ? ' | ' + 'BIN: ' + hex : '') +
              ' | '
              );

  conversion.text(conversionType);

  if (debug) {
    console.log('CONVERSION: ' + conversionType + ' | ' +
                (hex != NaN && conversionType != HEXADECIMAL ? ' | ' + 'HEX: ' + hex : ' | --------') +
                (dec != NaN && conversionType != DECIMAL     ? ' | ' + 'DEC: ' + dec : ' | --------') +
                (oct != NaN && conversionType != OCTAL       ? ' | ' + 'OCT: ' + hex : ' | --------') +
                (bin != NaN && conversionType != BINARY      ? ' | ' + 'BIN: ' + hex : ' | --------') +
                ' | ');
  }
}

$(document).ready(function() {
  Tipped.create('#conversion-type', 'Change base.');
  Tipped.create('#arrow-advanced', 'Show letters.');
});

lettersDiv.hide();

lettersOverlay.click(function() {
  $(this).hide();
  lettersDiv.show();
});

numbers.each(function(index) {
    numbers.eq(index).click(function() {
    	arrayOfValues.push(numbers.eq(index).text());
    	var string = getParagraphTextById('#result') + numbers.eq(index).text();
		  result.text(string.replace(/\s+/g, ''));
      calculate(false);
	});
});

letters.each(function(index) {
    letters.eq(index).click(function() {
    	arrayOfValues.push(letters.eq(index).text());
    	var string = getParagraphTextById('#result') + letters.eq(index).text();
		  result.text(string.replace(/\s+/g, ''));
      calculate(false);
	});
});

zero.click(function() {
	arrayOfValues.push(zero.text());
	var string = getParagraphTextById('#result') + zero.text();
	result.text(string.replace(/\s+/g, ''));
  calculate(false);
});

conversion.click(function() {
  calculate(true);
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
