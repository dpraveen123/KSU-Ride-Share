import { Routes } from '@angular/router';
import { DriverComponent } from './driver/driver.component';
import { DriverslistComponent } from './driverslist/driverslist.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ScheduleRideComponent } from './schedule-ride/schedule-ride.component';

export const routes: Routes = [
  // {
  //   path: '', //default component to display
  //   component: AppComponent,
  // },
  {
    path: 'schedule-ride', //when students added
    component: ScheduleRideComponent,
  },
  {
    path: '**', //when path cannot be found, keep this at the bottom
    component: NotFoundComponent,
  },
  {
    path: 'driver', //default component to display
    component: DriverslistComponent,
  },
  {
    path: 'driver/addDriver', //when students added
    component: DriverComponent,
  },
  {
    path: 'driver/editDriver/:_id', //when students edited
    component: DriverComponent,
  },
  {
    path: 'driver/listDrivers', //when students listed
    component: DriverslistComponent,
  },
  // {
  //   path: 'editStudent/:_id', //when students edited
  //   component: StudentFormComponent,
  // },
  // {
  //   path: 'listStudents', //when students listed
  //   component: ListStudentsComponent,
  // },
];
