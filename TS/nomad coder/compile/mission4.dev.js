"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.head = head;
exports.hasIn = hasIn;
exports.isBoolean = isBoolean;
exports.toString = toString;
exports.split = split;
exports.hasPath = hasPath;
exports.filter = filter;
exports.every = every;
exports.map = map;

var _getTag = _interopRequireDefault(require("./.internal/getTag.js"));

var _isObjectLike = _interopRequireDefault(require("./isObjectLike.js"));

var _isSymbol = _interopRequireDefault(require("./isSymbol.js"));

var _castSlice = _interopRequireDefault(require("./.internal/castSlice.js"));

var _hasUnicode = _interopRequireDefault(require("./.internal/hasUnicode.js"));

var _isRegExp = _interopRequireDefault(require("./isRegExp.js"));

var _stringToArray = _interopRequireDefault(require("./.internal/stringToArray.js"));

var _castPath = _interopRequireDefault(require("./.internal/castPath.js"));

var _isArguments = _interopRequireDefault(require("./isArguments.js"));

var _isIndex = _interopRequireDefault(require("./.internal/isIndex.js"));

var _isLength = _interopRequireDefault(require("./isLength.js"));

var _toKey = _interopRequireDefault(require("./.internal/toKey.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Gets the first element of `array`.
 *
 * @since 0.1.0
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @see last
 * @example
 *
 * head([1, 2, 3])
 * // => 1
 *
 * head([])
 * // => undefined
 */
function head(array) {
  return array != null && array.length ? array[0] : undefined;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 * @see has, hasPath, hasPathIn
 * @example
 *
 * const object = create({ 'a': create({ 'b': 2 }) })
 *
 * hasIn(object, 'a')
 * // => true
 *
 * hasIn(object, 'b')
 * // => false
 */
function hasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false || (0, _isObjectLike["default"])(value) && (0, _getTag["default"])(value) === "[object Boolean]";
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * toString(null)
 * // => ''
 *
 * toString(-0)
 * // => '-0'
 *
 * toString([1, 2, 3])
 * // => '1,2,3'
 */

function toString(value) {
  if (value == null) {
    return "";
  } // Exit early for strings to avoid a performance hit in some environments.


  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return "".concat(value.map(function (other) {
      return other == null ? other : toString(other);
    }));
  }

  if ((0, _isSymbol["default"])(value)) {
    return value.toString();
  }

  var result = "".concat(value);
  return result === "0" && 1 / value === -INFINITY ? "-0" : result;
}

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;
/**
 * Splits `string` by `separator`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {number} [limit] The length to truncate results to.
 * @returns {Array} Returns the string segments.
 * @example
 *
 * split('a-b-c', '-', 2)
 * // => ['a', 'b']
 */

function split(string, separator, limit) {
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;

  if (!limit) {
    return [];
  }

  if (string && (typeof separator === "string" || separator != null && !(0, _isRegExp["default"])(separator))) {
    if (!separator && (0, _hasUnicode["default"])(string)) {
      return (0, _castSlice["default"])((0, _stringToArray["default"])(string), 0, limit);
    }
  }

  return string.split(separator, limit);
}

/** Used to check objects for own properties. */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Checks if `path` is a direct property of `object`.
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @see has, hasIn, hasPathIn
 * @example
 *
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * hasPath(object, 'a.b')
 * // => true
 *
 * hasPath(object, ['a', 'b'])
 * // => true
 */

function hasPath(object, path) {
  path = (0, _castPath["default"])(path, object);
  var index = -1;
  var _path = path,
      length = _path.length;
  var result = false;
  var key;

  while (++index < length) {
    key = (0, _toKey["default"])(path[index]);

    if (!(result = object != null && hasOwnProperty.call(object, key))) {
      break;
    }

    object = object[key];
  }

  if (result || ++index !== length) {
    return result;
  }

  length = object == null ? 0 : object.length;
  return !!length && (0, _isLength["default"])(length) && (0, _isIndex["default"])(key, length) && (Array.isArray(object) || (0, _isArguments["default"])(object));
}

/**
 * Iterates over elements of `array`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index, array).
 *
 * **Note:** Unlike `remove`, this method returns a new array.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ]
 *
 * filter(users, ({ active }) => active)
 * // => objects for ['barney']
 */
function filter(array, predicate) {
  var index = -1;
  var resIndex = 0;
  var length = array == null ? 0 : array.length;
  var result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

/**
 * Checks if `predicate` returns truthy for **all** elements of `array`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * **Note:** This method returns `true` for
 * [empty arrays](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty arrays.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 * @example
 *
 * every([true, 1, null, 'yes'], Boolean)
 * // => false
 */
function every(array, predicate) {
  var index = -1;
  var length = array == null ? 0 : array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }

  return true;
}

/**
 * Creates an array of values by running each element of `array` thru `iteratee`.
 * The iteratee is invoked with three arguments: (value, index, array).
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * map([4, 8], square)
 * // => [16, 64]
 */
function map(array, iteratee) {
  var index = -1;
  var length = array == null ? 0 : array.length;
  var result = new Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}