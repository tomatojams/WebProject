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
// LocalStorage API:
abstract class Storageee<T> {
  abstract setItem(key: string, value: T): void;
  abstract clearItem(key: string): void;
  abstract getItem(key: string): T | undefined;
  abstract clear(): void;
}

interface SStorage<T> {
  [key: string]: T;
}

class LocalStorages<T> implements Storagee<T> {
  setItem(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value)); // 데이터를 문자열로 변환하여 저장
  }

  clearItem(key: string) {
    localStorage.removeItem(key);
  }

  getItem(key: string): T | undefined {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined; // 문자열을 원래 타입으로 변환하여 반환
  }

  clear() {
    localStorage.clear();
  }
}

// Geolocation API:
type successFn = (position: GeolocationPosition) => void;
type errorFn = (error: GeolocationPositionError) => void;
type optionalObj = {
  maximumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;
};

class Geolocations {
  // 오버로딩된 메서드 정의
  getCurrentPosition(successFn: successFn): void;
  getCurrentPosition(successFn: successFn, errorFn?: errorFn): void;
  getCurrentPosition(successFn: successFn, errorFn?: errorFn, optionsObj?: optionalObj): void;

  // 실제 구현
  getCurrentPosition(successFn: successFn, errorFn?: errorFn, optionsObj?: optionalObj): void {
    navigator.geolocation.getCurrentPosition(successFn, errorFn, optionsObj);
  }

  // 오버로딩된 메서드 정의
  watchPosition(successFn: successFn): number;
  watchPosition(successFn: successFn, errorFn?: errorFn): number;
  watchPosition(successFn: successFn, errorFn?: errorFn, optionsObj?: optionalObj): number;

  // 실제 구현
  watchPosition(successFn: successFn, errorFn?: errorFn, optionsObj?: optionalObj): number {
    return navigator.geolocation.watchPosition(successFn, errorFn, optionsObj);
  }

  clearWatch(id: number): void {
    navigator.geolocation.clearWatch(id);
  }
}

// Example usage:
let localStoragee = new LocalStorages<string>();

const geo = new Geolocations();
