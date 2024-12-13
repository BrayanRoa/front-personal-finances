import { Injectable, signal, WritableSignal, computed } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FiltersService {
    // Signals para los filtros
    selectedBanksId = signal<number[] | null>(null);
    selectedCategoriesId = signal<number[] | null>(null);
    selectedTypeTransactionId = signal<string[] | null>(null);
    selectedTypeRecurringTransactionId = signal<string[] | null>(null);
    selectedMonths = signal<string[]>([(new Date().getMonth() + 1).toString()]);
    selectedYear = signal<number | null>(null);

    pagination = signal<{ page: number; per_page: number }>({
        page: 1,
        per_page: 10,
    });

    reloadTransactions = signal(false);

    // Computed para agrupar todos los filtros
    filters = computed(() => ({
        walletIds: this.selectedBanksId(),
        page: this.pagination().page,
        per_page: this.pagination().per_page,
        categoryIds: this.selectedCategoriesId(),
        repeats: this.selectedTypeRecurringTransactionId(),
        types: this.selectedTypeTransactionId(),
        months: this.selectedMonths(),
        years: this.selectedYear(),
    }));

    triggerReload(): void {
        this.reloadTransactions.set(true);
        this.reloadTransactions.set(false); // Resetear el valor para permitir futuros cambios
    }

    resetFilters() {
        this.selectedBanksId.set(null);
        this.selectedCategoriesId.set(null);
        this.selectedTypeTransactionId.set(null);
        this.selectedTypeRecurringTransactionId.set(null);
        this.selectedMonths.set([]);
        this.selectedYear.set(null);
        this.pagination.set({ page: 1, per_page: 10 })
        this.triggerReload();
    }
}