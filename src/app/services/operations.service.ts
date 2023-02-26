import { Injectable } from '@angular/core';
import { IEmployee } from '../models/employee';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  private employeesCopie: IEmployee[] = [];
  private isOperationsActive = new Subject<boolean>();
  constructor() {
    this.isOperationsActive.next(false);
  }
  getOperationsState() {
    return this.isOperationsActive.asObservable();
  }

  getEmployeesCopie() {
    return this.employeesCopie;
  }
  getEmployeeCopie(emp: IEmployee) {
    return this.employeesCopie.find((employee) => employee.id == emp.id);
  }
  setNewCopie(emp: IEmployee) {
    this.employeesCopie.push(emp);
  }

  addChangedCopie(emp: IEmployee, originalEmp: IEmployee) {
    if (originalEmp && JSON.stringify(originalEmp) != JSON.stringify(emp)) {
      this.updateCopie(emp);
    } else this.removeCopie(emp);
  }

  updateCopie(emp: IEmployee) {
    const indexToUpdate = this.employeesCopie.findIndex(
      (employee) => employee.id == emp.id
    );
    if (indexToUpdate != -1) {
      this.employeesCopie[indexToUpdate] = emp;
    } else this.setNewCopie(emp);
  }
  removeCopie(emp: IEmployee) {
    this.employeesCopie = this.employeesCopie.filter(
      (employee) => emp.id != employee.id
    );
  }

  initCopies() {
    this.employeesCopie = [];
    this.isOperationsActive.next(false);
  }
}
