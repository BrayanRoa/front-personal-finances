import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MetaData, Transaction } from '../../interfaces/transaction.interface';
import { Table } from 'primeng/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';

interface Month {
  name: string;
  code: string;
}

interface Year {
  year: number;
}

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css'
})
export class ListTransactionsComponent {

  first: number = 0;
  rows: number = 10;
  months: Month[] | undefined
  years: Year[] | undefined
  searchControl = new FormControl();


  @Input() transactions: Transaction[] = [];
  @Input() meta!: MetaData;
  @Output() getPage = new EventEmitter<{ page: number,search?:string, year: number, month: number }>();
  @Output() onRowSelect = new EventEmitter<{ page: number, year: number, month: number }>();

  public myForm: FormGroup = this.fb.group({
    year: [new Date().getFullYear(), [Validators.required]],
    month: [new Date().getMonth() + 1, [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.years = [{ year: 2024 }, { year: 2025 }]
    this.months = [
      { code: '1', name: 'January' },
      { code: '2', name: 'February' },
      { code: '3', name: 'March' },
      { code: '4', name: 'April' },
      { code: '5', name: 'May' },
      { code: '6', name: 'June' },
      { code: '7', name: 'July' },
      { code: '8', name: 'August' },
      { code: '9', name: 'September' },
      { code: '10', name: 'October' },
      { code: '11', name: 'November' },
      { code: '12', name: 'December' },
    ]

    this.searchControl.valueChanges.pipe(
      // si en el input se colocar 3 caracteres se envia la petición, ahora si borramos todo en el input se lanza una peticion para que se tengan todas
      filter(value => value.length >= 3 || value === '')
    ).subscribe(value => {
      this.doSearch(value);
    });
  }

  public doSearch(param:string) {
    const year = this.myForm.get('year')?.value;
    const month = (this.myForm.get('month')?.value).code;
    const page = this.meta.currentPage 
    this.getPage.emit({ page, year, month, search: param });
  }

  onPageChange(event: any) {
    const year = this.myForm.get('year')?.value;
    const month = (this.myForm.get('month')?.value).code;
    const page = event.page + 1;
    this.getPage.emit({ page, year, month });
  }

  onRowSelectChange() {
    const year = this.myForm.get('year')?.value;
    const month = (this.myForm.get('month')?.value).code;
    const page = this.meta.currentPage
    this.onRowSelect.emit({ page, year, month });
  }

}
