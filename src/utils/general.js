export {
    validURL,
    getRandom,
    getRandomFloat,
    getRandomInt
}

const validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
};

const getRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)]
};

const getRandomFloat = (min, max) => {
    const str = (Math.random() * (max - min) + min).toFixed(4);

    return parseFloat(str);
}

const getRandomInt = (min, max) => {
    return (Math.random() * (max - min) + min).toString().split(".")[0];
};