import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { CategoryInterface } from '../../../shared/interfaces/category/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  visible: boolean = false;
  categories: CategoryInterface[] = [];
  loading: boolean = true
  skeletonArray: number[] = Array(12).fill(0); // Array de 12 elementos para skeletons


  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
    setTimeout(()=>{
      this.loading = false;
    },2000)
  }

  toggleModal(value: boolean): void {
    this.visible = value
  }

  getCategories() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response.data;
    });
  }

}
