export interface ITransactionByBudget {
    name: string;
    amount: number;
    date: Date;
    repeat: string;
    walletName: string;
    category: Category;
}

export interface Category {
    name: string;
    BudgetCategories: BudgetCategory[];
}

export interface BudgetCategory {
    budget: Budget;
}

export interface Budget {
    Wallet: Wallet;
}

export interface Wallet {
    name: string;
}
