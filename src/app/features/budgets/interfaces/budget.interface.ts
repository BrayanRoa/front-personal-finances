export interface BudgetData {
    id?: number,
    name: string,
    description: string,
    date: Date,
    end_date: Date,
    limit_amount: number,
    current_amount: number,
    percentage: number,
    active?: boolean,
    next_date: Date,
    userId?: string,
    // categories: string,
    repeat: string,
    walletId: number,
    BudgetCategories?: BudgetCategory[];
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,

}

export interface BudgetCategory {
    budgetId: number;
    categoryId: number;
    category:Category
}

export interface Category {
    name:string;
}
