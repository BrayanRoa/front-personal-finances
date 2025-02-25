import { MetaData } from "../common-response.interface";

export interface TransactionData {
    transactions: Transaction[];
    totalIncome: number;
    totalExpenses: number;
    meta: MetaData;
}

export interface Transaction {
    id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    date: string;
    amount: number;
    name: string;
    description: string;
    type: string;
    repeat: string;
    userId?: string;
    walletId: number;
    categoryId: number;
    active: boolean;
    next_date?: string | null;
    wallet?: Wallet;
    category?: Category;
}

interface Wallet {
    id: number;
    name: string;
    description: string;
    balance: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    userId: string;
}

interface Category {
    id: number;
    name: string;
    colorId: number;
    iconId: number;
    color: Color;
    icon: Icon;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    userId: string;
}

interface Color {
    id: number;
    hex: string;
}

interface Icon {
    id: number;
    path: string;
}