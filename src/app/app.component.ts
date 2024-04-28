import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DriverService } from './driver.service';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { ScheduleRideService } from './schedule-ride.service';
import { ScheduleRideComponent } from './schedule-ride/schedule-ride.component';
import { DriverComponent } from './driver/driver.component';
import { DriverslistComponent } from './driverslist/driverslist.component';
import { PaymentModuleComponent } from './payment-module/payment-module.component';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    ProfileEditorComponent,
    ReactiveFormsModule,
    ScheduleRideComponent,
    RouterModule,
    NavigationMenuComponent,
    DriverComponent,
    DriverslistComponent,
    PaymentModuleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ScheduleRideService, DriverService,PaymentService],
})
export class AppComponent {
  title = 'mean-test';
  formName = 'KSU Ride Share';
}
