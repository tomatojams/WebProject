const last = (arr) => {
    return arr[arr.length - 1];
};
const prepend = (arr, b) => {
    const reArray = [b, ...arr];
    return reArray;
};
const mix = (arr, brr) => {
    return [...arr, ...brr];
};
const count = (arr) => arr.length;
const findIndex = (arr, b) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === b) {
            return i;
        }
    }
    return undefined;
};
const slice = (arr, start, end) => {
    if (end) {
        return arr.slice(start, end);
    }
    return arr.slice(start);
};
