import { Component, Input } from '@angular/core';
import { CategoryCountData } from '../../interfaces/category.interface';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListCategoriesComponent {
  @Input() countTransactions: CategoryCountData[] = [];
  
}
