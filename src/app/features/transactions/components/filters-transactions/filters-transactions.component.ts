import { Component, Input, ViewChild } from '@angular/core';
import { FiltersService } from '../../services/filters.service';
import { MONTHS, RECURRING_TRANSACTION, TYPE_TRANSACTION } from '../../../../shared/constants/constants';
import { BanksInformation } from '../../../../shared/interfaces/wallet/wallet.interface';
import { CategoryInterface } from '../../../../shared/interfaces/category/category.interface';
import { DropdownOption } from '../../../../shared/components/bottons/drop-down/drop-down.component';
import { MultiSelect } from 'primeng/multiselect';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-filters-transactions',
  templateUrl: './filters-transactions.component.html',
  styleUrl: './filters-transactions.component.css'
})
export class FiltersTransactionsComponent {

  months = MONTHS
  recurring_transactions = RECURRING_TRANSACTION
  type_transactions = TYPE_TRANSACTION

  @Input()
  walletsData: BanksInformation[] = []
  @Input()
  categoryData: CategoryInterface[] = []
  @Input()
  years: DropdownOption[] = []

  @ViewChild('bankSelect') bankSelect!: MultiSelect;
  @ViewChild('categorySelect') categorySelect!: MultiSelect;
  @ViewChild('typeTransactionSelect') typeTransactionSelect!: MultiSelect;
  @ViewChild('recurringTransactionSelect') recurringTransactionSelect!: MultiSelect;
  @ViewChild('monthSelect') monthSelect!: MultiSelect;
  @ViewChild('yearSelect') yearSelect!: Dropdown;

  constructor(public filtersService: FiltersService) { }

  resetPage(): void {
    this.filtersService.pagination.set({ page: 1, per_page: 10 }); // Resetea la página a 1
  }

  onChangeBank(event: any): void {
    const selectedIds = event.value.map((bank: any) => bank.id);
    this.filtersService.selectedBanksId.set(selectedIds);
    this.resetPage()
  }

  onChangeCategories(event: any): void {
    const selectedIds = event.value.map((category: any) => category.id);
    this.filtersService.selectedCategoriesId.set(selectedIds);
    this.resetPage()
  }

  onChangeTypeTransactions(event: any): void {
    const selectedIds = event.value.map((type: any) => type.id);
    this.filtersService.selectedTypeTransactionId.set(selectedIds);
    this.resetPage()
  }

  onChangeRecurringTransaction(event: any): void {
    const selectedIds = event.value.map((type: any) => type.id);
    this.filtersService.selectedTypeRecurringTransactionId.set(selectedIds);
    this.resetPage()
  }

  onChangeMonths(event: any): void {
    const selectedIds = event.value.map((month: any) => month.id);
    this.filtersService.selectedMonths.set(selectedIds);
    this.resetPage()
  }

  onChangeYears(event: any): void {
    this.filtersService.selectedYear.set(event.value.id);
    this.resetPage()
  }

  clearFilters(): void {
    this.bankSelect.resetFilter();
    this.categorySelect.resetFilter();
    this.typeTransactionSelect.resetFilter();
    this.recurringTransactionSelect.resetFilter();
    this.monthSelect.resetFilter();
    this.yearSelect.clear();
    this.resetPage()
  }

}
