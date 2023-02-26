import { Injectable } from '@angular/core';
import { IEmployee } from '../models/employee';
import { BehaviorSubject } from 'rxjs';
import { getNewEmployeeId } from '../utils/utils';
import { LocalStorageService } from './local-storage.service';
import { OperationsService } from './operations.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<IEmployee[]>([]);
  constructor(
    private localStorageService: LocalStorageService,
    private operationsService: OperationsService
  ) {
    this.loadEmployees();
  }

  getEmployees() {
    return this.employeesSubject.asObservable();
  }
  getEmployeeById(id: number) {
    return this.employeesSubject
      .getValue()
      .find((employee) => employee.id == id);
  }

  removeEmployee(emp: IEmployee) {
    const employees = this.localStorageService
      .getParsedEmployees()
      .filter((employee) => employee.id != emp.id);
    this.localStorageService.setStringifiedEmployees(employees);
    this.employeesSubject.next(employees);
  }
  addEmployee(emp: IEmployee) {
    const employees = this.localStorageService.getParsedEmployees();
    emp.id = getNewEmployeeId(employees);
    employees.push(emp);
    this.localStorageService.setStringifiedEmployees(employees);
    this.employeesSubject.next(employees);
  }
  updateEmployees() {
    if (this.operationsService.getEmployeesCopie().length != 0) {
      let employees = this.localStorageService.getParsedEmployees();
      employees = employees.map((employee) => {
        const employeeCopie = this.operationsService.getEmployeeCopie(employee);
        if (employeeCopie && employeeCopie != employee) {
          return employeeCopie;
        } else {
          return employee;
        }
      });
      this.localStorageService.setStringifiedEmployees(employees);
      this.employeesSubject.next(employees);
      this.operationsService.initCopies();
    }
  }
  updateEmployeeCopie(emp: IEmployee) {
    const originalEmp = this.employeesSubject
      .getValue()
      .find((employee) => emp.id == employee.id);
    this.operationsService.addChangedCopie(emp, originalEmp!);
  }

  cancelOperations() {
    this.employeesSubject.next(this.localStorageService.getParsedEmployees());
    this.operationsService.initCopies();
  }

  loadEmployees() {
    this.localStorageService.initEmployees();
    this.operationsService.initCopies();
    this.employeesSubject.next(this.localStorageService.getParsedEmployees());
  }
}
