import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  standalone: true,
  selector: 'app-payment-module',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment-module.component.html',
  styleUrl: './payment-module.component.css',
  providers: [PaymentService],
})
export class PaymentModuleComponent implements OnInit {
  paymentForm: FormGroup = new FormGroup({});
  showProfileCard: boolean = false;
  userPaymentDetails: any;
  editPayment: any = null;
  public mode = 'Add';
  private id: any; //ride payment ID

  ridersPayment: any;
  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getRidersPayment();
    this.paymentForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{12}$')],
      ],
      expireDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      country: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  //method called OnInit
  getRidersPayment() {
    this.paymentService.getRidersPayment().subscribe((data: any) => {
      this.ridersPayment = data;
    });
  }
  showCardNumberErrors() {
    const cardNumberControl = this.paymentForm.get('cardNumber');
    return (
      cardNumberControl &&
      cardNumberControl.invalid &&
      (cardNumberControl.dirty || cardNumberControl.touched)
    );
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
    return (
      expireDateControl &&
      expireDateControl.invalid &&
      (expireDateControl.dirty || expireDateControl.touched)
    );
  }
  showCVVErrors() {
    const cvvNumberControl = this.paymentForm.get('cvv');
    return (
      cvvNumberControl &&
      cvvNumberControl.invalid &&
      (cvvNumberControl.dirty || cvvNumberControl.touched)
    );
  }
  validateCVVNumber(event: any) {
    const input = event.target.value;
    const pattern = /^[0-9]*$/;

    if (!pattern.test(input) || input.length > 3) {
      event.preventDefault();
    }
  }
  showCountryErrors() {
    const countryNumberControl = this.paymentForm.get('country');
    return (
      countryNumberControl &&
      countryNumberControl.invalid &&
      (countryNumberControl.dirty || countryNumberControl.touched)
    );
  }
  showZipCodeErrors() {
    const zipcodeNumberControl = this.paymentForm.get('zip');
    return (
      zipcodeNumberControl &&
      zipcodeNumberControl.invalid &&
      (zipcodeNumberControl.dirty || zipcodeNumberControl.touched)
    );
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
      const riderPaymentData = this.paymentForm.value;

      if (this.mode == 'Add') {
        this.paymentService.addRidersPayment(riderPaymentData).subscribe(() => {
          this.getRidersPayment();
        });
        this.resetForm();
      }

      console.log(this.mode, this.editPayment, 'bgsfgdjhksahzb');
      if (this.mode == 'Edit' && this.editPayment) {
        console.log(this.paymentForm.value);
        const riderPaymentId = this.editPayment._id;
        this.paymentService
          .editRidersPayment(riderPaymentId, this.paymentForm.value)
          .subscribe(() => {
            this.getRidersPayment();
            this.resetForm();
          });
      }
      //     this.paymentService.editRidersPayment(String(id), cardNumber, expireDate,cvv,country,zip );
    } else {
      console.log(
        'Form is invalid. Please check for validation errors.',
        this.paymentForm.value
      );
    }
  }
  toggleProfileCard() {
    if (this.showProfileCard) {
      const userId = '661c3801a883f795ecb5f507';
      // Fetch user payment details when profile card is shown
      this.paymentService
        .getRidersPayment()
        .subscribe((paymentDetails: any) => {
          console.log(paymentDetails, 'paymentDetails');
          const userPaymentDetail = paymentDetails.find(
            (detail: any) => detail._id === userId
          );
          if (userPaymentDetail) {
            this.userPaymentDetails = userPaymentDetail;
          } else {
            console.log('User payment detail not found');
          }
        });
    }
    this.showProfileCard = !this.showProfileCard;
  }

  editPaymentDetails(rider: any) {
    this.mode = 'Edit';
    this.editPayment = rider;
    this.paymentForm.patchValue({
      cardNumber: rider.cardNumber,
      expireDate: rider.expireDate,
      cvv: rider.cvv,
      country: rider.country,
      zip: rider.zip,
    });
    console.log(
      rider,
      this.mode,
      this.editPayment,
      this.paymentForm,
      'rider data'
    );
    this.toggleProfileCard();
    // this.onSubmit()
  }

  deletePaymentDetails(id: string) {
    this.paymentService.deleteRiderpayment(id).subscribe(() => {
      this.getRidersPayment();
      console.log('Deleted record successfully');
    });
    // Implement delete functionality here
  }
  resetForm() {
    this.mode = 'Add';
    this.editPayment = null;
    this.paymentForm.reset();
  }
}
