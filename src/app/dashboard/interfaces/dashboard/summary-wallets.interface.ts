export interface summaryWalletsResponse {
    totalIncome: number,
    totalExpenses: number,
    budgetsActives: number,
    totalTransactions: number
}

export interface graphVerticalData {
    month: string,
    type: string
    total: number
}

export interface graphPolarity {
    name: string,
    transactionCount: number
}

export interface budgetInformation {
    name: string,
    repeat: string,
    limit_amount: number,
    current_amount: number,
    percentage: number,
    categories: string[]
}