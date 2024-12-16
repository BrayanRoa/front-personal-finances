export interface WalletData {
    id: number;
    name: string;
    description: string;
    main_account: boolean;
    initial_balance: number;
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