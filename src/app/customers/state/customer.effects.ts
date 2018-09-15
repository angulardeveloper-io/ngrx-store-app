import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { CustomerService } from "../customer.service";
import * as customerActions from "../state/customer.actions";
import { Customer } from "../customer.model";

@Injectable()
export class CustomerEffect {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.LoadCustomers>(
      customerActions.CustomerActionTypes.LOAD_CUSTOMERS
    ),
    mergeMap((action: customerActions.LoadCustomers) =>
      this.customerService.getCustomers().pipe(
        map(
          (customers: Customer[]) =>
            new customerActions.LoadCustomersSuccess(customers)
        ),
        catchError(err => of(new customerActions.LoadCustomersFail(err)))
      )
    )
  );

  @Effect()
  loadCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.LoadCustomer>(
      customerActions.CustomerActionTypes.LOAD_CUSTOMER
    ),
    mergeMap((action: customerActions.LoadCustomer) =>
      this.customerService.getCustomerById(action.payload).pipe(
        map(
          (customer: Customer) =>
            new customerActions.LoadCustomerSuccess(customer)
        ),
        catchError(err => of(new customerActions.LoadCustomerFail(err)))
      )
    )
  );

  @Effect()
  createCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.CreateCustomer>(
      customerActions.CustomerActionTypes.CREATE_CUSTOMER
    ),
    map((action: customerActions.CreateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.createCustomer(customer).pipe(
        map(
          (newCustomer: Customer) =>
            new customerActions.CreateCustomerSuccess(newCustomer)
        ),
        catchError(err => of(new customerActions.CreateCustomerFail(err)))
      )
    )
  );

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.UpdateCustomer>(
      customerActions.CustomerActionTypes.UPDATE_CUSTOMER
    ),
    map((action: customerActions.UpdateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.updateCustomer(customer).pipe(
        map(
          (updateCustomer: Customer) =>
            new customerActions.UpdateCustomerSuccess({
              id: updateCustomer.id,
              changes: updateCustomer
            })
        ),
        catchError(err => of(new customerActions.UpdateCustomerFail(err)))
      )
    )
  );

  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<customerActions.DeleteCustomer>(
      customerActions.CustomerActionTypes.DELETE_CUSTOMER
    ),
    map((action: customerActions.DeleteCustomer) => action.payload),
    mergeMap((id: number) =>
      this.customerService.deleteCustomer(id).pipe(
        map(() => new customerActions.DeleteCustomerSuccess(id)),
        catchError(err => of(new customerActions.DeleteCustomerFail(err)))
      )
    )
  );
}
