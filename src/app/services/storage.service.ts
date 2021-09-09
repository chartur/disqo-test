import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  getJsonItem<T>(key: string): T {
    const data = localStorage.getItem(key);
    const parse: T = JSON.parse(data);
    return parse;
  }

  storeJsonItem(key: string, data: any): void {
    const stringify = JSON.stringify(data);
    localStorage.setItem(key, stringify);
  }
}
