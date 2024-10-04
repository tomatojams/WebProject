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

export { head };

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

export { hasIn };

import getTag from "./.internal/getTag.js";
import isObjectLike from "./isObjectLike.js";

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
  return (
    value === true ||
    value === false ||
    (isObjectLike(value) && getTag(value) === "[object Boolean]")
  );
}

export { isBoolean };

import isSymbol from "./isSymbol.js";

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

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
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map((other) => (other == null ? other : toString(other)))}`;
  }
  if (isSymbol(value)) {
    return value.toString();
  }
  const result = `${value}`;
  return result === "0" && 1 / value === -INFINITY ? "-0" : result;
}

export { toString };

import castSlice from "./.internal/castSlice.js";
import hasUnicode from "./.internal/hasUnicode.js";
import isRegExp from "./isRegExp.js";
import stringToArray from "./.internal/stringToArray.js";

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295;

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
  if (string && (typeof separator === "string" || (separator != null && !isRegExp(separator)))) {
    if (!separator && hasUnicode(string)) {
      return castSlice(stringToArray(string), 0, limit);
    }
  }
  return string.split(separator, limit);
}

export { split };

import castPath from "./.internal/castPath.js";
import isArguments from "./isArguments.js";
import isIndex from "./.internal/isIndex.js";
import isLength from "./isLength.js";
import toKey from "./.internal/toKey.js";

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

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
  path = castPath(path, object);

  let index = -1;
  let { length } = path;
  let result = false;
  let key;

  while (++index < length) {
    key = toKey(path[index]);
    if (!(result = object != null && hasOwnProperty.call(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index !== length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return (
    !!length &&
    isLength(length) &&
    isIndex(key, length) &&
    (Array.isArray(object) || isArguments(object))
  );
}

export { hasPath };

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
  let index = -1;
  let resIndex = 0;
  const length = array == null ? 0 : array.length;
  const result = [];

  while (++index < length) {
    const value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

export { filter };

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
  let index = -1;
  const length = array == null ? 0 : array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

export { every };

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
  let index = -1;
  const length = array == null ? 0 : array.length;
  const result = new Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

export { map };
