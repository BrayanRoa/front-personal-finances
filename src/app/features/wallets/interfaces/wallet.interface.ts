export interface WalletData {
    id: number;
    name: string;
    description: string;
    main_account: boolean;
    initial_balance: number;
    incomes: number;
    expenses: number;
    balance: number;
    // type:string;
}

export interface WalletPercentages {
    name: string;
    percentage: number;
}

export interface WalletIncomesAndExpenses {
    name: string
    type: string
    total: number
}

export interface IMonthlyBalanceByWallet {
    name_bank: string;
    info: {
        name: string;
        month: string;
        balance: number
    }[]
}