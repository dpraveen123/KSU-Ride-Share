/// <reference types="@types/googlemaps" />
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GoogleMapsService } from '../googlemaps.service';
import { ScheduleRideService } from '../schedule-ride.service';
import { DriverService } from '../driver.service';

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
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class ScheduleRideComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  rides: any[] = [];
  rideForm: FormGroup;
  mode = 'Add';
  editedRide: any = null;
  map!: google.maps.Map;
  public drivers:any;

  constructor(
    private fb: FormBuilder,
    private rideService: ScheduleRideService,
    private googleMapsService: GoogleMapsService,
    private driverService:DriverService
  ) {
    this.rideForm = this.fb.group({
      date: [''],
      time: [''],
      destination: [''],
      driver: [''],
    });
  }

  getDrivers(){
    this.driverService.getDrivers().subscribe({
		  
		  next: (data:any)=> { this.drivers = data },
		  error: (err:any) => console.error(err),
		  complete: () =>( console.log('finished loading'))
		});

  }

  ngOnInit(): void {
    this.getRides();
    this.getDrivers();
    // this.initializeMap();
  }

  ngAfterViewInit(): void {
    if (this.mapContainer) {
      this.initializeMap();
    }
  }

  initializeMap() {
    if (this.mapContainer && this.mapContainer.nativeElement) {
      this.map = this.googleMapsService.initializeMap(
        this.mapContainer.nativeElement
      );
      // Add click event listener to the map to handle place selection
      google.maps.event.addListenerOnce(this.map, 'click', (event) => {
        this.handlePlaceSelection(event.latLng);
      });
    } else {
      console.error('Map container element not found or not initialized.');
    }
  }

  handlePlaceSelection(latLng: google.maps.LatLng) {
    // Reverse geocode the selected location to get the address
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        // Set the destination form control with the selected place
        console.log(results[0].formatted_address);
        this.rideForm.patchValue({
          destination: results[0].formatted_address,
        });
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  }

  getRides() {
    this.rideService.getRides().subscribe((data: any) => {
      this.rides = data;
    });
  }

  onSubmit() {
    console.log('rideData', this.rideForm);
    const rideData = this.rideForm.value;
    if (this.mode === 'Add') {
      this.rideService.addRide(rideData).subscribe(() => {
        this.getRides();
        this.resetForm();
      });
    } else if (this.mode === 'Edit' && this.editedRide) {
      const rideId = this.editedRide._id;
      console.log('this.editRideee', this.editedRide);
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
    console.log('deleteRide', ride);
    const rideId = ride._id;
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
