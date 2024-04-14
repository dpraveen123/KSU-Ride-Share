import { Component,OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule,FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {PaymentService} from '../payment.service'

@Component({
  standalone: true,
  selector: 'app-payment-module',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './payment-module.component.html',
  styleUrl: './payment-module.component.css'
})
export class PaymentModuleComponent {
  paymentForm: FormGroup = new FormGroup({});
  // cardNumber = new FormControl('');
  // constructor(private fb: FormBuilder) {
  //   this.paymentForm = this.fb.group({
  //     cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
  //     expireDate: ['', Validators.required],
  //     cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
  //     country: ['', Validators.required],
  //     zip: ['', Validators.required]
  //     // address: this.fb.group({
  //     //   // street: [''],
  //     //   // city: [''],
  //     //   // state: [''],
        
  //     // })
  //   });
  // }

  constructor(private fb: FormBuilder, private paymentService: PaymentService) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      expireDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      country: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  showCardNumberErrors() {
    const cardNumberControl = this.paymentForm.get('cardNumber');
    return cardNumberControl && cardNumberControl.invalid && (cardNumberControl.dirty || cardNumberControl.touched);
  }
  validateCardNumber(event: any) {
    const input = event.target.value;
    const pattern = /^[0-9]*$/;

    if (!pattern.test(input) || input.length >= 12) {
      event.preventDefault();
    }
  }
  showExpiredDateErrors() {
    const expireDateControl = this.paymentForm.get('expireDate');
    return expireDateControl && expireDateControl.invalid && (expireDateControl.dirty || expireDateControl.touched);
  }
  showCVVErrors()
  {
    const cvvNumberControl = this.paymentForm.get('cvv');
    return cvvNumberControl && cvvNumberControl.invalid && (cvvNumberControl.dirty || cvvNumberControl.touched);
  }
  validateCVVNumber(event: any) {
    const input = event.target.value;
    const pattern = /^[0-9]*$/;

    if (!pattern.test(input) || input.length > 3) {
      event.preventDefault();
    }
  }
  showCountryErrors()
  {
    const countryNumberControl = this.paymentForm.get('country');
    return countryNumberControl && countryNumberControl.invalid && (countryNumberControl.dirty || countryNumberControl.touched);
  }
  showZipCodeErrors()
  {
    const zipcodeNumberControl = this.paymentForm.get('zip');
    return zipcodeNumberControl && zipcodeNumberControl.invalid && (zipcodeNumberControl.dirty || zipcodeNumberControl.touched);
  }
  validateZipCodeNumber(event: any) {
    const input = event.target.value;
    const pattern = /^[0-9]*$/;

    if (!pattern.test(input) || input.length > 5) {
      event.preventDefault();
    }
  }
  onSubmit() {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value);
      let cardNumber=this.paymentForm.get('cardNumber')?.value??""
      
      let expireDate=this.paymentForm.get('expireDate')?.value??""
      
      let cvv=this.paymentForm.get('cvv')?.value??""
      
      let country=this.paymentForm.get('country')?.value??""
      
      let zip=this.paymentForm.get('zip')?.value??""

      this.paymentService.addRiders(cardNumber, expireDate,cvv,country,zip )
      // You can perform further actions here, such as sending the form data to a backend server
    } else {
      // Handle form validation errors if needed
      console.log("Form is invalid. Please check for validation errors.",this.paymentForm.value);
    }
  
  }
}
