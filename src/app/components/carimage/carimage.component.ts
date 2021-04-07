import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';

import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import {faLiraSign} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-carimage',
  templateUrl: './carimage.component.html',
  styleUrls: ['./carimage.component.css']
})
export class CarimageComponent implements OnInit {
  //RentAl formu
  // customers: Customer[] = [];
  // customerId: Number;
  // customerName: string;
  // companyName: string;
  // customerEmail: string;
  // rentDate!: Date;
  // returnDate!: Date;
  // carDailyPrice: number;
  // amountPay: number = 0;
  //!RentAl formu

  carDetails:Car[];
  faLira = faLiraSign;
  apiUrl = environment.baseUrl;
  rentalDetail: Rental[];
  userFindeksForm: FormGroup;
  findeks:number;
  carFindeks:number
  
  // carId: number;
  // carBrandName: string;
  // carModelName: string;
  
  
  
  
  cars:Car[] =[];
  images:CarImage[]=[];
  carImageBasePath="https://localhost:44356/images";
  carImageUrl: string = '';



  constructor(private carService:CarService,
    private activatedRoot:ActivatedRoute, 
    private carimageService:CarimageService, private router: Router,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private cartService:CartService,
    private authService:AuthService,
    private userService:UserService,
    private formBuilder:FormBuilder,
    private localStorageService:LocalStorageService,
    
    private rentalService: RentalService
    ) { }

  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
        this.getCarImagesByCarId(params["carId"])
        
        
      }
    });
    this.createUserFindeksForm();
  }

  getCarDetail(carId:number){
    this.carService.getCarByCarId(carId).subscribe(response=>{
     this.cars=response.data
     this.carFindeks = this.cars[0].findeksScore;

    })
     
  }
  getCarImagesByCarId(carId:number){
    this.carimageService.getCarImagesByCarId(carId).subscribe(response=>{
     this.images=response.data
     this.images.forEach(photo=>{
       photo.imagePath = this.carImageBasePath + photo.imagePath.substring(photo.imagePath.lastIndexOf("\\"), photo.imagePath.length)
     })
    })
     
  }

  getCarByCarId(carId:number){
    this.carService.getCarByCarId(carId).subscribe(response=>{
      this.cars=response.data
    })
  }
  
  getCurrentSliderImageClass(sliderImage: CarImage): string {
    if (this.images[0] === sliderImage) {
       return 'carousel-item active';
    }

    return 'carousel-item';
 }

 addCart(car:Car){
  if(this.authService.isAuthenticated()){
    console.log(this.carFindeks,this.localStorageService.get('findeks'))
    if(parseInt(this.localStorageService.get('findeks')) !=undefined || parseInt(this.localStorageService.get('findeks'))!=null){
      if(this.carFindeks<parseInt(this.localStorageService.get('findeks')))
      {
        this.rentalService.getRentalByCarId(car.id).subscribe(response => {
          this.rentalDetail = response.data;
        });
        if (this.cartService.list().length > 0) {
          this.router.navigate(['/cart'])
        }
        this.cartService.addToCart(car);
        this.router.navigate(['/cart'])
      }else{
        this.toastrService.error("Arabayı Kiralayamazsınız Findeks Puanınız yetmiyor.")
      }
    }else{
      this.toastrService.info("Lütfen Findeks Puanınızı Hesaplayınız")

    }
  }else{
    this.toastrService.info("Lütfen Giriş Yapınız")
  }
}

createUserFindeksForm() {
  this.userFindeksForm = this.formBuilder.group({
    tc: ['', Validators.required],
    dateYear: ['', Validators.required],
  });
}

getUserFindeks() {
  if (this.userFindeksForm.valid) {
    if(parseInt(this.localStorageService.get('findeks'))>0){
      this.toastrService.info('Findeks Puanınız: ' + this.localStorageService.get('findeks'))
    }else{
      let userFindeksModel = Object.assign({}, this.userFindeksForm.value);
      this.userService.fakeFindeks(userFindeksModel).subscribe(response => {
        this.findeks = response.data.userFindeks;
        this.localStorageService.set('findeks',this.findeks.toString())
        this.toastrService.info('Findeks Hesaplaması Başarılı. Findeks Puanınız: ' + this.findeks);
      });
    }
  }
}








  




}
