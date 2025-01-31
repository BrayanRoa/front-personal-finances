import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from '../../interface/category.interface';
import { CategoryInterface } from '../../../../shared/interfaces/category/category.interface';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListCategoriesComponent implements OnInit {

  loading: boolean = true
  skeletonArray: number[] = Array(12).fill(0); // Array de 12 elementos para skeletons
  modal: boolean = false

  @Output()
  selectedRecordUpdate = new EventEmitter<({ id: number, category: ICategory })>();

  @Input() categories: ICategory[] = [];


  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000)
  }

  sendEditRow(id: number, category: ICategory) {
    const categoryPayload: ICategory = {
      ...category,
    };
    this.selectedRecordUpdate.emit({ id, category: categoryPayload })
  }

}
