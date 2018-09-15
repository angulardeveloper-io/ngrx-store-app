import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { EffectsModule, Actions } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { customerReducer } from "./state/customer.reducer";
import { CustomerEffect } from "./state/customer.effects";

import { CustomerComponent } from "./customer/customer.component";
import { CustomerAddComponent } from "./customer-add/customer-add.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";

const customerRoutes: Routes = [{ path: "", component: CustomerComponent }];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(customerRoutes),
    StoreModule.forFeature("customers", customerReducer),
    EffectsModule.forFeature([CustomerEffect])
  ],
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent
  ]
})
export class CustomersModule {}
