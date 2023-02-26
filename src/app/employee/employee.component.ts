import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { OperationsService } from '../services/operations.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  submitted = false;
  employeeForm!: FormGroup;
  operationsStateSubscription!: Subscription;
  @Input() employee?: IEmployee;
  @Input() isAdd?: boolean;
  @Input() isReadOnlyName?: boolean;
  @Input() isReadOnlySurName?: boolean;
  @Input() isReadOnlyYears?: boolean;
  @Input() formClass?: string;
  @Output() updateEmp = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private operationsService: OperationsService
  ) {
    this.operationsStateSubscription = this.operationsService
      .getOperationsState()
      .subscribe((value) => {
        if (!value) this.employeeForm.reset();
      });
  }
  ngOnInit(): void {
    this.initForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) this.initForm();
  }
  initForm() {
    this.employeeForm = this.formBuilder.group({
      id: [this.employee?.id],
      name: [
        this.employee?.name || '',
        [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
          Validators.minLength(3),
        ],
      ],
      surname: [
        this.employee?.surname || '',
        [
          Validators.required,
          Validators.pattern('[a-z A-Z]*'),
          Validators.minLength(3),
        ],
      ],
      years: [this.employee?.years || 0, [Validators.min(0)]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    } else {
      this.employeeService.addEmployee(this.employeeForm.value);
      this.employeeForm.reset();
      this.submitted = false;
    }
  }
  onUpdateEmp() {
    this.updateEmp.emit(this.employeeForm.value);
  }
  ngOnDestroy(): void {
    this.operationsStateSubscription.unsubscribe();
  }
}
