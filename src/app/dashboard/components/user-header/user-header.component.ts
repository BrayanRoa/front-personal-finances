import { Component } from '@angular/core';
import { MONTHS, SelectInterface } from '../../../shared/constants/constants';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {

  cities: City[] | undefined;

  selectedMonth: City | undefined;


  months: SelectInterface[] = []

  ngOnInit() {
    this.months = MONTHS;
  }

}
