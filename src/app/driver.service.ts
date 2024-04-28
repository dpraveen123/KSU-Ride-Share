import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DriverService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getDrivers() {
        return this.http.get('http://localhost:8000/drivers');
    }

    getDriver(driverId: string) {
        return this.http.get('http://localhost:8000/drivers/'+ driverId);
    }
    addDriver(name: string,
        email: string,
        phone: string,
        carInfo: string,
        primaryCampus: string,
        availability: string){
        this.http.post('http://localhost:8000/drivers', {name,email,phone,carInfo,primaryCampus,availability})
            .subscribe((responseData) => {
                console.log(responseData);
            }); 
        }
    deleteDriver(driverId: string) {
        this.http.delete("http://localhost:8000/drivers/" + driverId)
            .subscribe(() => {
                console.log('Deleted: ' +driverId);
                
           });
        location.reload();
            
    }
    updateDriver(driverId: string,name: string,email:string, phone: string,carInfo:string,primaryCampus:string,availability:string) {
        //request path http://localhost:8000/students/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/drivers/" + 
        driverId,{ name,email, phone,carInfo,primaryCampus,availability })
        .subscribe(() => {
            console.log('Updated: ' + driverId);
        });
        
    }
           
}
                     


                    