import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'  // api ye bağlanmak için bu yazıldı
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44356/api/'; 

  constructor(private httpClient:HttpClient) { }

  getCarDetails():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);

  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+ "cars/carsDetailsByBrandId?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);

  }

}
