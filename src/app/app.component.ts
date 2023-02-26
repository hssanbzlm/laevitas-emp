import { Component, OnInit } from '@angular/core';
import { IEmployee } from './models/employee';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'laevitas-emp';
  selectedEmployee!: IEmployee;
  constructor(private sideBarService: SidebarService) {}

  ngOnInit(): void {}
  setSelectedEmployee(emp: IEmployee) {
    this.selectedEmployee = emp;
  }
  handleEmployeeClick() {
    this.sideBarService.setSidebarState(false);
  }
}
