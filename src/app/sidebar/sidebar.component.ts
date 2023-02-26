import { Component, Input } from '@angular/core';
import { IEmployee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { SidebarService } from '../services/sidebar.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() selectedEmployee!: IEmployee;
  sidebarShow = false;
  sideBarSubscription!: Subscription;
  constructor(
    private employeeService: EmployeeService,
    private sidebarService: SidebarService
  ) {
    this.sideBarSubscription = this.sidebarService
      .getSideBarState()
      .subscribe((sidebarState) => {
        this.sidebarShow = sidebarState;
      });
  }

  handleUpdatedEmp(emp: IEmployee) {
    this.employeeService.updateEmployeeCopie(emp);
  }

  closeSidebar() {
    this.sidebarService.setSidebarState(false);
  }
  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }
}
