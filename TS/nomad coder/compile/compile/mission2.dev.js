"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dict = {
  food: "to eat",
  apple: "delicious"
};

var Word = function Word(term, def) {
  _classCallCheck(this, Word);

  this.term = term;
  this.def = def;
};

var Dict =
/*#__PURE__*/
function () {
  // 매개변수 없는 생성자
  function Dict() {
    _classCallCheck(this, Dict);

    this.words = {};
  }

  _createClass(Dict, [{
    key: "add",
    value: function add(word) {
      if (this.words[word.term] === undefined) {
        this.words[word.term] = word.def;
      }
    }
  }, {
    key: "get",
    value: function get(term) {
      return this.words[term];
    }
  }, {
    key: "delete",
    value: function _delete(term) {
      delete this.words[term];
    }
  }, {
    key: "update",
    value: function update(word) {
      this.words[word.term] = word.def;
    }
  }, {
    key: "showAll",
    value: function showAll() {
      console.log(this.words);
    }
  }, {
    key: "count",
    value: function count() {
      return Object.keys(this.words).length;
    }
  }, {
    key: "upsert",
    value: function upsert(word) {
      this.words[word.term] = word.def;
    }
  }, {
    key: "exists",
    value: function exists(term) {
      return !!this.words[term];
    }
  }, {
    key: "bulkAdd",
    value: function bulkAdd(bulk) {
      var _this = this;

      bulk.forEach(function (item) {
        return _this.words[item.term] = item.def;
      });
    }
  }, {
    key: "bulkDelete",
    value: function bulkDelete(bulk) {
      var _this2 = this;

      bulk.forEach(function (item) {
        delete _this2.words[item.term];
      });
    }
  }]);

  return Dict;
}();

var tomatojams = new Word("tomatojams", "마이 닉네임");
var myDic = new Dict();
myDic.add(tomatojams);
console.log(myDic);
tomatojams.def = 'salt';