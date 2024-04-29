import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//we know that response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class RiderRegistrationService {
  constructor(private http: HttpClient) {}

  // Uses http.get() to load data
  getRiders() {
    return this.http.get('http://localhost:8000/riders');
  }

  getRider(driverId: string) {
    return this.http.get('http://localhost:8000/riders/' + driverId);
  }
  addRider(name: string, email: string, phone: string) {
    this.http
      .post('http://localhost:8000/riders', {
        name,
        email,
        phone,
      })
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
  deleteRider(driverId: string) {
    this.http
      .delete('http://localhost:8000/riders/' + driverId)
      .subscribe(() => {
        console.log('Deleted: ' + driverId);
      });
    location.reload();
  }
  updateRider(driverId: string, name: string, email: string, phone: string) {
    //request path http://localhost:8000/students/5xbd456xx
    //first and last names will be send as HTTP body parameters
    this.http
      .put('http://localhost:8000/riders/' + driverId, { name, email, phone })
      .subscribe(() => {
        console.log('Updated: ' + driverId);
      });
  }
}
