import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentModuleComponent } from './payment-module/payment-module.component';

export const routes: Routes = [
  { path: 'ridersPayment', component: PaymentModuleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
