import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleRideService {
  constructor(private http: HttpClient) {}

  getRides() {
    return this.http.get<any[]>('http://localhost:8000/rides');
  }

  addRide(rideData: any) {
    return this.http.post('http://localhost:8000/rides', rideData);
  }

  updateRide(rideId: number, rideData: any) {
    return this.http.put(`http://localhost:8000/rides/${rideId}`, rideData);
  }

  deleteRide(rideId: number) {
    return this.http.delete(`http://localhost:8000/rides/${rideId}`);
  }
}
