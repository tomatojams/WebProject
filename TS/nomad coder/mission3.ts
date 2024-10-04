// LocalStorage API:

abstract class Storagee<T> {
  abstract setItem(key: string, value: T): void;
  abstract clearItem(key: string): void;
  abstract getItem(key: string): T;
  abstract clear(): void;
}

interface SStorag<T> {
  [key: string]: T;
}

class localStorages<T> implements Storagee<T> {
  private storgae: SStorag<T> = {};

  setItem(key: string, value: T) {
    this.storgae[key] = value;
  }

  clearItem(key: string) {
    delete this.storgae[key];
  }
  getItem(key: string): T {
    return this.storgae[key];
  }

  clear() {
    this.storgae = {};
  }
}
let localStoragee = new localStorages<string>();

// Geolocation API:

type sucessFn = (position: Geolocation) => boolean;
type errorFn = (error: GeolocationPositionError) => boolean;
type optionalObj = {
  maxiumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;
};

type sucess = (position: Geolocation) => boolean;
type error = (error: GeolocationPositionError) => boolean;
type options = {
  maxiumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;
};

type getCurrentPostion = (sucessFn: sucessFn, errorFn?: errorFn, optionalObj?: optionalObj) => void;

type watchPosiont = (sucess: sucess, error?: error, options?: options) => number;

type clearWatch = (id: number) => void;

class geolocaions {
  getCurrentPostion: getCurrentPostion = (sucessFn, errorFn, optionalObj) => {};

  watchPosiont: watchPosiont = (sucess, error, options) => {
    const num = 3;
    return num;
  };

  clearWatch: clearWatch = (id) => {};
}

const geo = new geolocaions();
