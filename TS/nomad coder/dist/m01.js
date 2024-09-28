var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var last = function (arr) {
    return arr[arr.length - 1];
};
var prepend = function (arr, b) {
    var reArray = __spreadArrays([b], arr);
    return reArray;
};
var mix = function (arr, brr) {
    return __spreadArrays(arr, brr);
};
var count = function (arr) { return arr.length; };
var findIndex = function (arr, b) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === b) {
            return i;
        }
    }
    return undefined;
};
var slice = function (arr, start, end) {
    if (end) {
        return arr.slice(start, end);
    }
    return arr.slice(start);
};
