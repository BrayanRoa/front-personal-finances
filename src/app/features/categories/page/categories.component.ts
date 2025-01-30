import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { CategoryInterface } from '../../../shared/interfaces/category/category.interface';
import { ICategory } from '../interface/category.interface';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { CommonResponse } from '../../../shared/interfaces/common-response.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent extends BaseComponent implements OnInit {

  visible: boolean = false;
  categories: ICategory[] = [];
  loading: boolean = true
  skeletonArray: number[] = Array(12).fill(0); // Array de 12 elementos para skeletons

  constructor(private categoryService: CategoryService) {
    super()
  }

  ngOnInit(): void {
    this.getCategories()
    setTimeout(() => {
      this.loading = false;
    }, 2000)
  }

  toggleModal(value: boolean): void {
    this.visible = value
  }

  getCategories() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response.data;
    });
  }

  saveCategory(data: { budget: CategoryInterface, action: string }) {
    this.categoryService.create(data.budget).pipe(
      finalize(() => {
        this.toggleModal(false)
      })).subscribe({
        next: (response) => {
          this.handleResponse(response.status, response.data);
          this.getCategories()
        },
        error: (error) => {
          console.log(error);
          this.handleResponse(error.error.status, error.error.data);
        }
      })
  }

}
