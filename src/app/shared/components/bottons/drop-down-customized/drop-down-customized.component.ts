import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drop-down-customized',
  templateUrl: './drop-down-customized.component.html',
  styleUrl: './drop-down-customized.component.css'
})
export class DropDownCustomizedComponent {

  @Input() options: { label: string; value: any; color?: string | null }[] = [];
  value: any;

  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
