let dict = {
    food: "to eat",
    apple: "delicious",
};
class Word {
    term;
    def;
    constructor(term, def) {
        this.term = term;
        this.def = def;
    }
}
class Dict {
    words;
    // 매개변수 없는 생성자
    constructor() {
        this.words = {};
    }
    add(word) {
        if (this.words[word.term] === undefined) {
            this.words[word.term] = word.def;
        }
    }
    get(term) {
        return this.words[term];
    }
    delete(term) {
        delete this.words[term];
    }
    update(word) {
        this.words[word.term] = word.def;
    }
    showAll() {
        console.log(this.words);
    }
    count() {
        return Object.keys(this.words).length;
    }
    upsert(word) {
        this.words[word.term] = word.def;
    }
    exists(term) {
        return !!this.words[term];
    }
    bulkAdd(bulk) {
        bulk.forEach((item) => (this.words[item.term] = item.def));
    }
    bulkDelete(bulk) {
        bulk.forEach((item) => {
            delete this.words[item.term];
        });
    }
}
const tomatojams = new Word("tomatojams", "마이 닉네임");
const myDic = new Dict();
myDic.add(tomatojams);
console.log(myDic);
tomatojams.def = 'salt';
