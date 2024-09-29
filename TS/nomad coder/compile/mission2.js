var dict = {
    food: "to eat",
    apple: "delicious"
};
var Word = /** @class */ (function () {
    function Word(term, def) {
        this.term = term;
        this.def = def;
    }
    return Word;
}());
var Dict = /** @class */ (function () {
    // 매개변수 없는 생성자
    function Dict() {
        this.words = {};
    }
    Dict.prototype.add = function (word) {
        if (this.words[word.term] === undefined) {
            this.words[word.term] = word.def;
        }
    };
    Dict.prototype.get = function (term) {
        return this.words[term];
    };
    Dict.prototype["delete"] = function (term) {
        delete this.words[term];
    };
    Dict.prototype.update = function (word) {
        this.words[word.term] = word.def;
    };
    Dict.prototype.showAll = function () {
        console.log(this.words);
    };
    Dict.prototype.count = function () {
        return Object.keys(this.words).length;
    };
    Dict.prototype.upsert = function (word) {
        this.words[word.term] = word.def;
    };
    Dict.prototype.exists = function (term) {
        return !!this.words[term];
    };
    Dict.prototype.bulkAdd = function (bulk) {
        var _this = this;
        bulk.forEach(function (item) { return (_this.words[item.term] = item.def); });
    };
    Dict.prototype.bulkDelete = function (bulk) {
        var _this = this;
        bulk.forEach(function (item) {
            delete _this.words[item.term];
        });
    };
    return Dict;
}());
var tomatojams = new Word("tomatojams", "마이 닉네임");
var myDic = new Dict();
myDic.add(tomatojams);
console.log(myDic);
