import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

   localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key : string){
    return this.localStorage.getItem(key);
  }

  set(key: string, value: string){
    this.localStorage.setItem(key,value);
  }

  remove(key: string){
    this.localStorage.removeItem(key);
  }

  clean(){
    this.localStorage.clear();
  }

}
