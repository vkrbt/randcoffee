exports.fillWith = function fillWith(text, replace) {
    let replaceValues = Object.entries(replace);

    return replaceValues.reduce((newText, [key, value]) => {
        return newText.replace(`%%${key}%%`, value);
    }, text);
};
