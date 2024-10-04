"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.exit = exit;

//@ts-check

/**
 * 프로그램 시작
 * @param {object} config 

 * @param {string} config.url
 
 * @returns {boolean}

 */
function init(config) {
  return true;
}
/**
 * 프로그램 종료
 * @param {number} code
 * @returns {number}
 */


function exit(code) {
  return code + 1;
}