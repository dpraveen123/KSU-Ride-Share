import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-ride',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './schedule-ride.component.html',
  styleUrl: './schedule-ride.component.css',
})
// export class ScheduleRideComponent {
//   scheduleRideForm = this.formBuilder.group({
//     date: ['', Validators.required],
//     time: ['', Validators.required],
//     destination: ['', Validators.required],
//     driver: ['', Validators.required],
//   });

//   constructor(private formBuilder: FormBuilder) {}

//   onSubmit(event: Event): void {
//     event.preventDefault();
//     if (this.scheduleRideForm.valid) {
//       console.log(this.scheduleRideForm.value);
//     } else {
//       console.log('Form is invalid');
//     }
//   }
// }
export class ScheduleRideComponent {
  scheduleRideForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.scheduleRideForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      destination: ['', Validators.required],
      driver: ['', Validators.required],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.scheduleRideForm.valid) {
      console.log(this.scheduleRideForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  showErrors(controlName: string): boolean | null {
    const control = this.scheduleRideForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}