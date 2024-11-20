import { MetaData } from "../../../shared/interfaces/common-response.interface"

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
    budgets: budgetData[],
    meta: MetaData
}

export interface budgetData {
    name: string,
    repeat: string,
    limit_amount: number,
    current_amount: number,
    percentage: number,
    categories: string[]
}