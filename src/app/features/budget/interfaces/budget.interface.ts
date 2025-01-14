import { Transaction } from "../../../shared/interfaces/transactions/getAll.interface";

export interface BudgetData {
    id?: number,
    name: string,
    description: string,
    date: Date | string,
    end_date: Date | string,
    limit_amount: number,
    current_amount?: number,
    available_amount?: number // esta campo es calculado, no viene de la api
    percentage?: number, // este valor tambien lo calculo aqui con la data recibida
    active?: boolean,
    next_date: Date,
    userId?: string,
    repeat: string,
    walletId: number,
    BudgetCategories?: BudgetCategory[];
    BudgetTransaction?: BudgetTransaction[];
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
}

export interface BudgetCategory {
    budgetId: number;
    categoryId: number;
    category: Category
}

export interface Category {
    name: string;
}

export interface BudgetTransaction {
    id: number;
    budgetId: number;
    transactionId: number;
    createdAt: Date;
    transaction: Transaction;
}

// export interface Transaction {
//     id: number;
//     date: Date | string;
//     amount: number;
//     name: string;
//     description: string;
//     type: string;
//     repeat: string;
//     next_date: null;
//     active: boolean;
//     created_at: Date;
//     updated_at: Date;
//     deleted_at: null;
//     userId: string;
//     walletId: number;
//     categoryId: number;
// }


// esta interface es para las tarjetas donde se ven todos los budgets
export interface IBudgets {
    id:number;
    name: string;
    description: string;
    date: Date;
    end_date: Date;
    limit_amount: number;
    current_amount?: number;
    percentage?: number;
    categories: string[];
    available_amount: number,
    repeat: string
}
