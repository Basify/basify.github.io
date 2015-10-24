// Declare array of the input numbers
var arrayOfValues = new Array();

// Declare needed variables
var numbers = $('.number-item');
var letters = $('.letter-item');
var zero = $('#zero-item');
var result = $('#result');
var cancel = $('#cancel');
var output = $('#output');
var lettersDiv = $('#hex-letters');
var lettersOverlay = $('#hex-letters-overlay');
var conversion = $('#conversion-type');
var simplifyDiv = $('#simplify');

var HEXADECIMAL = 'HEX';
var DECIMAL = 'DEC';
var OCTAL = 'OCT';
var BINARY = 'BIN';

var hex, dec, oct, bin;

var conversionType = DECIMAL;

var start;
var longpress = 400;

// Change this to true if you want some logs
var debug = true;

// Check if the input number is binary
function isBinary(input) {
    return input.search(/^[10]+$/) != -1;
}

// Check if the input number is octal
function isOctal(input) {
    return input.search(/^[01234567]+$/) != -1;
}

// Remove last char of the string
function getStringWithoutLastChar(string) {
    return string.toString()
        .replace(/\d{11}$/, '')
        .split(',')
        .join('')
        .replace(/\s+/g, '');
}

// This returns a string of concatenated values stored inside an array
function getConcatenatedArrayOfValues() {
    var tmpString;
    for (var i = 0; i < arrayOfValues.length; i++) {
        tmpString.concat(arrayOfValues[i]);
    }
    return tmpString;
}

// Remove the last item from an array
function removeLastItemFromArrayOfValues() {
    arrayOfValues.splice(-1, 1);
}

// Set output clearing the last element
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

// Remove every item inside an array
function clearAll() {
    while (arrayOfValues.length > 0) {
        arrayOfValues.pop();
    }
    result.text('');
    output.text('');
}

// Calculate the values [base = 16]
function calculateFromHex(input) {
    hex = parseInt(input).toString().toUpperCase();
    dec = parseInt(input, 16).toString(10);
    oct = parseInt(input, 16).toString(8);
    bin = parseInt(input, 16).toString(2);
}

// Calculate the values abase = 10]
function calculateFromDec(input) {
    hex = parseInt(input, 10).toString(16).toUpperCase();
    dec = parseInt(input, 10).toString();
    oct = parseInt(input, 10).toString(8);
    bin = parseInt(input, 10).toString(2);
}

// Calculate the values [base = 8]
function calculateFromOct(input) {
    hex = parseInt(input, 8).toString(16).toUpperCase();
    dec = parseInt(input, 8).toString(10);
    oct = parseInt(input).toString();
    bin = parseInt(input, 8).toString(2);
}

// Calculate the values [base = 2]
function calculateFromBin(input) {
    hex = parseInt(input, 2).toString(16).toUpperCase();
    dec = parseInt(input, 2).toString(10);
    oct = parseInt(input, 2).toString(8);
    bin = parseInt(input).toString();
}

// Switch the conversion type
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

// The main function used to show the output
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

    output.text((hex != 'NAN' && conversionType != HEXADECIMAL ? ' | ' + 'HEX: ' + hex : '') +
        (dec != 'NAN' && conversionType != DECIMAL ? ' | ' + 'DEC: ' + dec : '') +
        (oct != 'NAN' && conversionType != OCTAL ? ' | ' + 'OCT: ' + oct : '') +
        (bin != 'NAN' && conversionType != BINARY ? ' | ' + 'BIN: ' + bin : '') +
        ' | '
    );

    if (input != '') {
        if (conversionType == BINARY) {
            if (!isBinary(input)) {
                output.text('Input is not a binary value!');
            }
        }

        if (conversionType == OCTAL) {
            if (!isOctal(input)) {
                output.text('Input is not an octal value!');
            }
        }
    } else {
        output.text('');
    }

    conversion.text(conversionType);

    if (debug) {
        console.log('CONVERSION: ' + conversionType + ' | ' +
            (hex != NaN && conversionType != HEXADECIMAL ? ' | ' + 'HEX: ' + hex : ' | --------') +
            (dec != NaN && conversionType != DECIMAL ? ' | ' + 'DEC: ' + dec : ' | --------') +
            (oct != NaN && conversionType != OCTAL ? ' | ' + 'OCT: ' + oct : ' | --------') +
            (bin != NaN && conversionType != BINARY ? ' | ' + 'BIN: ' + bin : ' | --------') +
            ' | ');
    }
}

// Setup tooltips
$(document).ready(function() {
    Tipped.create('#conversion-type', 'Change base.');
    Tipped.create('#arrow-advanced', 'Show letters.');
});

// Hide the letters and the arrow down
lettersDiv.hide();
simplifyDiv.hide();

// Handle arrow up click
lettersOverlay.click(function() {
    $(this).hide();
    lettersDiv.show();
    simplifyDiv.show();
});

// Handle arrow down click
simplifyDiv.click(function() {
    $(this).hide();
    lettersDiv.hide();
    simplifyDiv.hide();
    lettersOverlay.show();
});

// Handle EACH number click
numbers.each(function(index) {
    numbers.eq(index).click(function() {
        arrayOfValues.push(numbers.eq(index).text());
        var string = result.text() + numbers.eq(index).text();
        result.text(string.replace(/\s+/g, ''));
        calculate(false);
    });
});

// Handle EACH letter click
letters.each(function(index) {
    letters.eq(index).click(function() {
        arrayOfValues.push(letters.eq(index).text());
        var string = result.text() + letters.eq(index).text();
        result.text(string.replace(/\s+/g, ''));
        calculate(false);
    });
});

// Handle 0 click
zero.click(function() {
    arrayOfValues.push(zero.text());
    var string = result.text() + zero.text();
    result.text(string.replace(/\s+/g, ''));
    calculate(false);
});

// Handle conversion [BIN/OCT/DEC/HEX]
conversion.click(function() {
    calculate(true);
});

// Handle longpress to clear all
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
