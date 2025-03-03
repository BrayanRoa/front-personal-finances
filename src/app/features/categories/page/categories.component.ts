import { Component, OnInit, signal } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { CategoryInterface } from '../../../shared/interfaces/category/category.interface';
import { ICategory } from '../interface/category.interface';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent extends BaseComponent implements OnInit {

  categories: ICategory[] = [];
  visible: boolean = false;
  idCategorySelected = signal<number>(0)
  categorySelected!: ICategory;
  nameButton: 'Save' | 'Update' = 'Save';

  constructor(private categoryService: CategoryService) {
    super()
  }

  ngOnInit(): void {
    this.getCategories()
  }

  toggleModal(value: boolean): void {
    this.nameButton = 'Save'
    this.visible = value;
  }

  getCategories() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response.data;
    });
  }

  saveOrUpdateCategory(data: { budget: CategoryInterface, action: string }) {
    if (data.action === 'save') {
      this.categoryService.create(data.budget).pipe(
        finalize(() => {
          this.toggleModal(false)
        })).subscribe({
          next: (response) => {
            this.handleResponse(response.status, response.data);
            this.getCategories()
          },
          error: (error) => {
            this.handleResponse(error.error.status, error.error.data);
          }
        })
    } else {
      this.categoryService.update(this.idCategorySelected(), data.budget).pipe(
        finalize(() => {
          this.toggleModal(false)
        })).subscribe({
          next: (response) => {
            this.handleResponse(response.status, response.data);
            this.getCategories()
          },
          error: (error) => {
            this.handleResponse(error.error.status, error.error.data);
          }
        })
    }
  }

  editRow(data: { id: number, category: ICategory }) {
    this.idCategorySelected.set(data.id)
    this.categorySelected = data.category;
    this.nameButton = "Update"
    this.visible = true
  }

}
