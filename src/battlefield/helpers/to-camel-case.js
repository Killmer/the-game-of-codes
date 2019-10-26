const toCamelCase = (string) => {
    if (!string || typeof string !== 'string') return string;
    const rawArr = string.split('-');
    const camelCasedrawArr = rawArr.map((element, i) => {
        if (i === 0) {
            return element;
        }
        const firstLetter = element.charAt(0).toUpperCase();
        const restOfTheWord = element.slice(1);
        return firstLetter + restOfTheWord;
    });

    return camelCasedrawArr.join('');
}

export default toCamelCase;