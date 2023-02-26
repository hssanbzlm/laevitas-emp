import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { ButtonComponent } from './shared/button/button.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    ButtonComponent,
    EmployeeComponent,
    SidebarComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
