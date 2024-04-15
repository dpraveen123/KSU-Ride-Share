import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PaymentService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getRidersPayment() {
        return this.http.get('http://localhost:8000/ridersPayment');
    }
    addRidersPayment(cardNumber: number, expireDate: string,cvv:number,country:string,zip:string) {
        this.http.post('http://localhost:8000/ridersPayment',{ cardNumber, expireDate,cvv,country,zip })
            .subscribe((responseData) => {
                console.log(responseData);
            }); 
        }
        deleteRiderpayment(id: string) {
            console.log(id,"in service delete id")
            this.http.delete("http://localhost:8000/ridersPayment/" + id)
                .subscribe(() => {
                    console.log('Deleted: ' + id);
                });
        }
}
 