// LocalStorage API:
class Storagee {
}
class localStorages {
    constructor() {
        this.storgae = {};
    }
    setItem(key, value) {
        this.storgae[key] = value;
    }
    clearItem(key) {
        delete this.storgae[key];
    }
    getItem(key) {
        return this.storgae[key];
    }
    clear() {
        this.storgae = {};
    }
}
let localStoragee = new localStorages();
class geolocaions {
    constructor() {
        this.getCurrentPostion = (sucessFn, errorFn, optionalObj) => { };
        this.watchPosiont = (sucess, error, options) => {
            const num = 3;
            return num;
        };
        this.clearWatch = (id) => { };
    }
}
const geo = new geolocaions();
