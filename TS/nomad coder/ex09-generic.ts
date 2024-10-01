interface SStorage<T> {
  [key: string]: T;
}

class LocalStorage<T> {
  private storgae: SStorage<T> = {};

  set(key: string, value: T) {
    this.storgae[key] = value;
  }

  remove(key: string) {
    delete this.storgae[key];
  }
  get(key: string): T {
    return this.storgae[key];
  }

  clear() {
    this.storgae = {};
  }
}

const SStorage = new LocalStorage<string>();

SStorage.set("tomato", "nice");
const word = SStorage.get("tomato");

console.log(word);
