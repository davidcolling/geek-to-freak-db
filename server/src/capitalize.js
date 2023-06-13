// return the input with the character after each ' ' uppercase

const capitalize = string => {
    var output = '';
    if (string.length > 0) {
        if (string.charAt(0) !== ' ') {
            output += string.charAt(0).toUpperCase();
        } else {
            output += ' ';
        }
    }

    var previousChar = null;

    for (var i = 0; i < string.length; i++) {
        if(previousChar != null ) {
            if (previousChar === ' '  && string.charAt(i) !== ' ' ) {
                output += string.charAt(i).toUpperCase();
            } else {
                output += string.charAt(i);
            }
        }
        previousChar = string.charAt(i);
    }

    return output;
}

module.exports = capitalize;

