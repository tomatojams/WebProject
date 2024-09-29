type Words = {
  [key: string]: string;
};

let dict: Words = {
  food: "to eat",
  apple: "delicious",
};

class Word {
  constructor(
    public readonly term: string,
    public readonly def: string
  ) {}
}

class Dict {
  private words: Words;

  // 매개변수 없는 생성자
  constructor() {
    this.words = {};
  }

  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }

  get(term: string) {
    return this.words[term];
  }

  delete(term: string) {
    delete this.words[term];
  }

  update(word: Word) {
    this.words[word.term] = word.def;
  }

  showAll() {
    console.log(this.words);
  }

  count() {
    return Object.keys(this.words).length;
  }

  upsert(word: Word) {
    this.words[word.term] = word.def;
  }

  exists(term: string) {
    return !!this.words[term];
  }

  bulkAdd(bulk: Word[]) {
    bulk.forEach((item) => (this.words[item.term] = item.def));
  }

  bulkDelete(bulk: Word[]) {
    bulk.forEach((item) => {
      delete this.words[item.term];
    });
  }
}

const tomatojams = new Word("tomatojams", "마이 닉네임");
const myDic = new Dict();
myDic.add(tomatojams);
console.log(myDic);

tomatojams.def ='salt'