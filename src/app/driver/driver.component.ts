import { Component, OnInit } from '@angular/core';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import{MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit {
  public mode='Add';
  private id: any;
  private driver:any;
  
  

  constructor(private _myService: DriverService,private router:Router,public route:ActivatedRoute) {}
    ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if (paramMap.has('_id')) {
              this.mode = 'Edit'; /*request had a parameter _id */
              this.id = paramMap.get('_id');

              //request student info based on the id
              this._myService.getDriver(this.id).subscribe({
                  next: (data => {
                      //read data and assign to private variable student
                      this.driver = data;
                      //populate the firstName and lastName on the page
                      this.driverComponent.patchValue({
                          name: this.driver.name,
                          email:this.driver.email,
                          phone: this.driver.phone,
                          carInfo:this.driver.carInfo,
                          primaryCampus:this.driver.primaryCampus,
                          availability:this.driver.availability

                      })
                  }),

                  error: (err => console.error(err)),
                  complete: (() => console.log('finished loading'))
              });
          }
          else {
              this.mode = 'Add';
              this.id = null;
          }
      });
    }
driverComponent = new FormGroup({
  name: new FormControl(''),
  email:new FormControl(''),
  phone: new FormControl(''),
  carInfo:new FormControl(''),
  primaryCampus:new FormControl(''),
  availability:new FormControl('')
});

onSubmit(){
  let name = this.driverComponent.get('name')?.value ?? "";
  let email=this.driverComponent.get('email')?.value??"";
  let phone = this.driverComponent.get('phone')?.value ?? "";
  let carInfo = this.driverComponent.get('carInfo')?.value ?? "";
  let primaryCampus = this.driverComponent.get('primaryCampus')?.value ?? "";
  let availability = this.driverComponent.get('availability')?.value ?? "";
  console.log("You submitted: " + name + " " + phone);
  if (this.mode == 'Add')
      this._myService.addDriver(name,email,phone,carInfo,primaryCampus,availability);
  if (this.mode == 'Edit')
      this._myService.updateDriver(this.id, name, email,phone,carInfo,primaryCampus,availability);
  //this._myService.addStudents(firstName, lastName);
  this.router.navigate(['/listDrivers']);
}

}

  
    
  




