import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentModuleComponent } from './payment-module/payment-module.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule here
import { PaymentService } from './payment.service';
import {HttpClientModule} from '@angular/common/http'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PaymentModuleComponent, FormsModule, // Add FormsModule here
  ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[PaymentService]
})
export class AppComponent implements OnInit {
  title ='Ride-Share App';
  //declare variable to hold response and make it public to be accessible from components.html
  public riders: any;
  //initialize the call using StudentService 
  constructor(private _myService: PaymentService) { }
  ngOnInit() {
      this.getRiders();
  }
  //method called OnInit
  getRiders() {
  this._myService.getRiders().subscribe({
    //read data and assign to public variable students
    next: (data => { this.riders = data }),
    error: (err => console.error(err)),
    complete: (() => console.log('finished loading'))
  });
  }
}
   
