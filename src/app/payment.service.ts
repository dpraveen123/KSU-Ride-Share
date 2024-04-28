import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
  })
export class PaymentService {

    constructor(private http:HttpClient) {}
    getRidersPayment() {
        return this.http.get('http://localhost:8000/ridersPayment');
    }
    addRidersPayment(ridersPayment:any) {
        return this.http.post('http://localhost:8000/ridersPayment', ridersPayment);           
        }
    deleteRiderpayment(id: string) {
       return this.http.delete(`http://localhost:8000/ridersPayment/${id}`)
        }
    editRidersPayment(riderPaymentId:any,ridersPaymentData:any)
    {
        return this.http.put(`http://localhost:8000/ridersPayment/${riderPaymentId}`, ridersPaymentData);
    }
}
 