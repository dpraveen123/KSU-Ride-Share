import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DriverService } from '../driver.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-driverslist',
  standalone: true,
  imports: [RouterModule,CommonModule,MatButtonModule],
  templateUrl: './driverslist.component.html',
  styleUrl: './driverslist.component.scss',
  providers:[DriverService]
})
export class DriverslistComponent implements OnInit {
  
  public drivers:any;
  constructor(private _myService:DriverService){}
  ngOnInit(){
    this.getDrivers();
    
  }
  getDrivers(){
    this._myService.getDrivers().subscribe({
		  
		  next: (data:any)=> { this.drivers = data },
		  error: (err:any) => console.error(err),
		  complete: () =>( console.log('finished loading'))
		});

  }
  onDelete(driverId: string) {
    this._myService.deleteDriver(driverId);
    

}
}
