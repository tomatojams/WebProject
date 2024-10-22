/* classes 그리고 interfaces 를 활용하여, 아래 API를 위한 '미니' 버전을 구현하세요.

LocalStorage API
Geolocation API
LocalStorage API:
Use abstract classes and generics.
추상화 클래스와 제네릭을 사용하세요.
Usage:

localStorage.setItem(<key>, <value>)
localStorage.getItem(<key>)
localStorage.clearItem(<key>)
localStorage.clear()
Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Storage

Geolocation API:
overloading을 사용하세요.
geolocation.getCurrentPosition(successFn);
geolocation.getCurrentPosition(successFn, errorFn);
geolocation.getCurrentPosition(successFn, errorFn, optionsObj);
geolocation.watchPosition(success);
geolocation.watchPosition(success, error);
geolocation.watchPosition(success, error, options);
geolocation.clearWatch(id);
Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation */

abstract class Storagee<T> {
  abstract setItem(key: string, value: T): void;
  abstract clearItem(key: string): void;
  abstract getItem(key: string): T | undefined;
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
  getItem(key: string): T | undefined {
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
