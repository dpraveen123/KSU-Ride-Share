import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PaymentService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getRiders() {
        return this.http.get('http://localhost:8000/riders');
    }
    addRiders(cardNumber: number, expireDate: string,cvv:number,country:string,zip:string) {
        this.http.post('http://localhost:8000/riders',{ cardNumber, expireDate,cvv,country,zip })
            .subscribe((responseData) => {
                console.log(responseData);
            }); 
        }
}
 