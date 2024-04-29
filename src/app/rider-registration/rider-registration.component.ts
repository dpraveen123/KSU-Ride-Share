import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RiderRegistrationService } from '../rider-registration.service';

@Component({
  selector: 'app-rider-registration',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './rider-registration.component.html',
  styleUrl: './rider-registration.component.css',
})
export class RiderRegistrationComponent {
  public mode = 'Add';
  private id: any;
  private rider: any;
  public riders: any;
  constructor(
    private _myService: RiderRegistrationService,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit'; /*request had a parameter _id */
        this.id = paramMap.get('_id');

        //request student info based on the id
        this._myService.getRider(this.id).subscribe({
          next: (data) => {
            //read data and assign to private variable student
            this.rider = data;
            //populate the firstName and lastName on the page
            this.riderComponent.patchValue({
              name: this.rider.name,
              email: this.rider.email,
              phone: this.rider.phone,
            });
          },

          error: (err) => console.error(err),
          complete: () => console.log('finished loading'),
        });
      } else {
        this.mode = 'Add';
        this.id = null;
      }
    });
    this.getDrivers();
  }
  riderComponent = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  });

  onSubmit() {
    let name = this.riderComponent.get('name')?.value ?? '';
    let email = this.riderComponent.get('email')?.value ?? '';
    let phone = this.riderComponent.get('phone')?.value ?? '';
    console.log('You submitted: ' + name + ' ' + phone);
    if (this.mode == 'Add') this._myService.addRider(name, email, phone);
    if (this.mode == 'Edit')
      this._myService.updateRider(this.id, name, email, phone);
    //this._myService.addStudents(firstName, lastName);
  }

  getDrivers() {
    this._myService.getRiders().subscribe({
      next: (data: any) => {
        this.riders = data;
      },
      error: (err: any) => console.error(err),
      complete: () => console.log('finished loading'),
    });
  }

  onDelete(driverId: string) {
    this._myService.deleteRider(driverId);
  }
}
