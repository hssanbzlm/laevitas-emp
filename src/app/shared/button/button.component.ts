import { Component, Input } from '@angular/core';

type buttonType = 'info' | 'danger' | 'success' | 'primary';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() buttonType!: buttonType;
  @Input() isDisabled = false;
}
