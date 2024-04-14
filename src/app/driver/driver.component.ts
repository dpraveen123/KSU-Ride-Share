import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent {
  
  driverForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.driverForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      carInfo: [''],
      primaryCampus: ['', Validators.required],
      availability: ['', Validators.required]
    });
  }

  onSubmit() {
    
    if (this.driverForm.valid) {
      console.log(this.driverForm.value);
      
    } else {
      console.log("Form is invalid");
    }
  }


  
}
