import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { ScheduleRideComponent } from './schedule-ride/schedule-ride.component';
import { ScheduleRideService } from './schedule-ride.service';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[ScheduleRideService]
})
export class AppComponent {
  title = 'mean-test';
  formName = 'KSU Ride Share';
}
