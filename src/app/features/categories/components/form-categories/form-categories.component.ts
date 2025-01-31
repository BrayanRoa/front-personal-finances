import { Component, EventEmitter, Input, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryInterface } from '../../../../shared/interfaces/category/category.interface';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { CategoryService } from '../../service/category.service';
import { COLOR_DEFAULT, ICON_DEFAULT } from '../../../../shared/constants/constants';
import { ICategory } from '../../interface/category.interface';

@Component({
  selector: 'app-form-categories',
  templateUrl: './form-categories.component.html',
  styleUrl: './form-categories.component.css'
})
export class FormCategoriesComponent extends BaseComponent implements OnInit {

  form!: FormGroup
  icons = signal<{ label: number, value: any }[]>([]);
  colors = signal<{ label: number, value: any }[]>([]);

  selectedIcon: string = ICON_DEFAULT;
  selectedColor: string = COLOR_DEFAULT;

  @Input()
  nameButton: "Save" | "Update" = "Save"

  @Input()
  category!: ICategory | null

  @Output()
  cancel = new EventEmitter<void>()

  @Output()
  sendCategory = new EventEmitter<({ budget: CategoryInterface, action: string })>


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    super()
  }

  ngOnInit(): void {
    this.loadColors()
    this.loadIcons()
    this.formConfig()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["category"] && changes["category"].currentValue) {
      this.populateFormData()
    }
  }

  formConfig() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      colorId: [null, Validators.required],
      iconId: [null, Validators.required]
    });
  }

  loadColors() {
    this.categoryService.getAllColors().subscribe({
      next: (response) => {
        const colors = response.data.map(c => {
          return ({
            label: c.id,
            value: c.hex,
          });
        })
        this.colors.set(colors)
      },
      error: (error) => this.handleResponse(error, 'Error fetching colors'),
    })
  }

  loadIcons() {
    this.categoryService.getAllIcons().subscribe({
      next: (response) => {
        const icons = response.data.map(i => {
          return ({
            label: i.id,
            value: i.path,
          });
        })
        this.icons.set(icons)
      },
      error: (error) => this.handleResponse(error, 'Error fetching icons'),
    })
  }

  onCancel() {
    this.formConfig()
    this.resetForm()
    this.cancel.emit()
  }

  resetForm() {
    this.form.reset({
      name: '',
      color: ICON_DEFAULT,
      icon: COLOR_DEFAULT
    });
    this.selectedIcon = ICON_DEFAULT;
    this.selectedColor = COLOR_DEFAULT;
  }

  toggleIcon(icon: string) {
    this.selectedIcon = icon
    // Actualizamos el valor del formulario
    const id = this.icons().filter(i => i.value === icon)[0].label
    this.form.get('iconId')?.setValue(id);
  }

  toggleColor(color: string) {
    this.selectedColor = color
    // Actualizamos el valor del formulario
    const id = this.colors().filter(i => i.value === color)[0].label
    this.form.get('colorId')?.setValue(id);
  }

  onSubmit() {
    if (!this.form.invalid) {
      const data = this.form.getRawValue()
      if (this.nameButton === 'Save') {
        this.sendCategory.emit({ budget: data, action: "save" });
      } else if (this.nameButton === 'Update') {
        this.sendCategory.emit({ budget: data, action: "update" });
      }
      this.resetForm()
    } else {
      console.log("invalid form!");
    }
  }

  populateFormData() {
    if (this.category) {
      this.form.patchValue({
        name: this.category.name,
        colorId: this.category.color.id, // Asignar el ID del color
        iconId: this.category.icon.id    // Asignar el ID del icono
      });

      // Obtener el valor del color e icono basados en los IDs
      const selectedColor = this.colors().find(c => c.label === this.category!.color.id)?.value || COLOR_DEFAULT;
      const selectedIcon = this.icons().find(i => i.label === this.category!.icon.id)?.value || ICON_DEFAULT;

      this.selectedColor = selectedColor;
      this.selectedIcon = selectedIcon;
    }
  }
}
