import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { CustomerComponent } from "./customer/customer.component";
import { CustomerAddComponent } from "./customer-add/customer-add.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";

const customerRoutes: Routes = [{ path: "", component: CustomerComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(customerRoutes)],
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent
  ]
})
export class CustomersModule {}
