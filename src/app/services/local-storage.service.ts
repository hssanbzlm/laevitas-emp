import { Injectable } from '@angular/core';
import jsonEmployees from '../../assets/users.json';
import { IEmployee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
    this.initEmployees();
  }
  setStringifiedEmployees(emp: IEmployee[]) {
    localStorage.setItem('emp', JSON.stringify(emp));
  }
  getParsedEmployees(): IEmployee[] {
    return JSON.parse(localStorage.getItem('emp')!);
  }
  initEmployees() {
    this.setStringifiedEmployees(jsonEmployees);
  }
}
