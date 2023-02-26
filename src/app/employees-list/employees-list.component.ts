import { Component, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { IEmployee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { SidebarService } from '../services/sidebar.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent {
  employees!: IEmployee[];
  employeesSubscription!: Subscription;
  @Output() selectedEmployee = new EventEmitter();
  constructor(
    private employeeService: EmployeeService,
    private sidebarService: SidebarService,
    private operationsSercice: OperationsService
  ) {}
  ngOnInit(): void {
    this.employeesSubscription = this.employeeService
      .getEmployees()
      .subscribe((employees) => {
        if (employees.length == 0) {
          setTimeout(() => {
            this.employeeService.loadEmployees();
          }, 500);
        }
        this.employees = employees;
      });
  }

  cancel() {
    this.employeeService.cancelOperations();
    this.sidebarService.setSidebarState(false);
  }

  save() {
    this.employeeService.updateEmployees();
    this.sidebarService.setSidebarState(false);
  }
  load() {
    this.employeeService.loadEmployees();
    this.sidebarService.setSidebarState(false);
  }
  remove(emp: IEmployee) {
    this.employeeService.removeEmployee(emp);
    this.sidebarService.setSidebarState(false);
  }

  handleUpdatedEmp(emp: IEmployee) {
    this.employeeService.updateEmployeeCopie(emp);
  }
  setSelectedEmployee(emp: IEmployee) {
    this.selectedEmployee.emit(emp);
    this.sidebarService.setSidebarState(true);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.employees, event.previousIndex, event.currentIndex);
  }
  isSaveDisabled() {
    return this.operationsSercice.getEmployeesCopie().length == 0;
  }
  employeesTrackById(index: number, item: IEmployee) {
    return item.id;
  }
  ngOnDestroy(): void {
    this.employeesSubscription.unsubscribe();
  }
}
