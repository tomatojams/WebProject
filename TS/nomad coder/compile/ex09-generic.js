class LocalStorage {
    constructor() {
        this.storgae = {};
    }
    set(key, value) {
        this.storgae[key] = value;
    }
    remove(key) {
        delete this.storgae[key];
    }
    get(key) {
        return this.storgae[key];
    }
    clear() {
        this.storgae = {};
    }
}
const SStorage = new LocalStorage();
SStorage.set("tomato", "nice");
const word = SStorage.get("tomato");
console.log(word);
