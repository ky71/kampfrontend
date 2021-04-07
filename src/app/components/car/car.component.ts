import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] =[];
  colors:Color[]=[];
  dataLoaded = false;
  filterText="";
   
 

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"] && params["colorId"]){
        this.getCarsByBrandAndColorId(params["brandId"], params["colorId"])
      }else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
    }else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCarDetails();
      }
    })
    
    
  }

  getCarDetails(){
    this.carService.getCarDetails().subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
    

  }

  getCarsByBrand(brandId: number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
      
    });   
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    });
  }

  getCarByCarId(carId:number){
    this.carService.getCarByCarId(carId).subscribe(response=>{
      this.cars=response.data
    })
  }

  addToCart(car:Car){
    if(car.id===1){
      this.toastrService.error("Sepete eklenmedi",car.brandName)

    }else{
      this.toastrService.success("Sepete eklendi",car.description)
      this.cartService.addToCart(car);
    }
    
    


  }

  getCarsByBrandAndColorId(brandId:number, colorId:number){
    this.carService.getCarsByBrandAndColorId(brandId,colorId).subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true
      if (this.cars.length==0) {
        this.toastrService.info("Aradığınız kriterlere uygun bir araç bulunamadı.", "Filtreleme sonucu")
      }else{ this.toastrService.info("Filtrelenen araçlar listelendi", "Filtreleme sonucu")}
     
    })
  }

    

  
}
