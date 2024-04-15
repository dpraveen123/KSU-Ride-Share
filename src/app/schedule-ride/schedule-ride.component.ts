import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ScheduleRideService } from '../schedule-ride.service';

@Component({
  selector: 'app-schedule-ride',
  templateUrl: './schedule-ride.component.html',
  styleUrls: ['./schedule-ride.component.css'],
  standalone: true,
  imports: [
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class ScheduleRideComponent implements OnInit {
  rides: any[] = [];
  rideForm: FormGroup;
  mode = 'Add';
  editedRide: any = null;

  constructor(
    private fb: FormBuilder,
    private rideService: ScheduleRideService
  ) {
    this.rideForm = this.fb.group({
      date: [''],
      time: [''],
      destination: [''],
      driver: [''],
    });
  }

  ngOnInit(): void {
    this.getRides();
  }

  getRides() {
    this.rideService.getRides().subscribe((data: any) => {
      this.rides = data;
    });
  }

  onSubmit() {
    const rideData = this.rideForm.value;
    if (this.mode === 'Add') {
      this.rideService.addRide(rideData).subscribe(() => {
        this.getRides();
        this.resetForm();
      });
    } else if (this.mode === 'Edit' && this.editedRide) {
      const rideId = this.editedRide.id;
      this.rideService.updateRide(rideId, rideData).subscribe(() => {
        this.getRides();
        this.resetForm();
      });
    }
  }

  editRide(ride: any) {
    this.mode = 'Edit';
    this.editedRide = ride;
    this.rideForm.patchValue({
      date: ride.date,
      time: ride.time,
      destination: ride.destination,
      driver: ride.driver,
    });
  }

  deleteRide(ride: any) {
    const rideId = ride.id;
    this.rideService.deleteRide(rideId).subscribe(() => {
      this.getRides();
    });
  }

  resetForm() {
    this.mode = 'Add';
    this.editedRide = null;
    this.rideForm.reset();
  }
}
