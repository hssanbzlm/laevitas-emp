import { IEmployee } from '../models/employee';

export function getNewEmployeeId(employee: IEmployee[]): number {
  return Math.max(...employee.map((emp) => emp.id)) + 1;
}
