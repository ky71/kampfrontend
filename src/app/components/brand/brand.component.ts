import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  dataLoaded = false;
  brands:Brand[] = [];
  currentBrand:Brand;
  filterText="";

  constructor(private brandService:BrandService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  
  getBrands() {

  this.brandService.getBrands().subscribe((response) =>{
    this.brands = response.data
    this.dataLoaded = true;
  });
 }

 setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
    
 }

 getCurrentBrandClass(brand:Brand){
   if(brand ==this.currentBrand){
     return "list-group-item active"

   }else{
    return "list-group-item"

   }
 }

 getAllBrandClass(){
    if(!this.currentBrand){
    return "list-group-item active"

    }else{
   return "list-group-item"

    }
  }

  addToCart(brand:Brand){
    this.toastrService.success(brand.brandName,"markası seçildi")


  }



}
