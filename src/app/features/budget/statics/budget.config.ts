import { FORMATTEDDATE } from "../../../shared/constants/constants";
import { FormFieldConfig } from "../../../shared/interfaces/generic-components/form.interface";

export const FORM_CONFIG_BUDGET: FormFieldConfig[] = [
    { type: 'text', label: 'Name', name: 'name', validations: [{ required: true }], sizeResponsive: 'md:col-3' },
    { type: 'text', label: 'Description', name: 'description', validations: [], sizeResponsive: 'md:col-6' },
    {
        type: 'text', label: 'Limit Amount', name: 'limit_amount', value: '0', validations: [{ required: true }], mask: {
            mask: 'separator.2',
            prefix: '$',
            thousandSeparator: ','
        },
        sizeResponsive: 'md:col-3'
    },
    { type: 'date', label: 'Date', name: 'date', value: FORMATTEDDATE, validations: [{ required: true }], sizeResponsive: 'md:col-4' },
    { type: 'date', label: 'End date', name: 'end_date', value: FORMATTEDDATE, validations: [{ required: true }], sizeResponsive: 'md:col-4' },
    {
        type: 'select', label: 'Repeat', name: 'repeat', value: 'NEVER', custom_options: [
            { name: 'No Repeat', code: 'NEVER' },
            { name: 'Every Day', code: 'EVERY DAY' },
            { name: 'Every Two Days', code: 'EVERY TWO DAYS' },
            { name: 'Every Working Day', code: 'EVERY WORKING DAY' },
            { name: 'Every Week', code: 'EVERY WEEK' },
            { name: 'Every Two Weeks', code: 'EVERY TWO WEEKS' },
            { name: 'Every Month', code: 'EVERY MONTH' },
            { name: 'Every Two Months', code: 'EVERY TWO MONTHS' },
            { name: 'Every Three Months', code: 'EVERY THREE MONTHS' },
            { name: 'Every Six Months', code: 'EVERY SIX MONTHS' },
            { name: 'Every Year', code: 'EVERY YEAR' },
        ], validations: [], sizeResponsive: 'md:col-4'
    },
    {
        type: 'multiSelect', label: 'Category', name: 'categoryId', value: "", options: [], validations: [{ required: true }], sizeResponsive: 'md:col-6'
    },
    {
        type: 'select', label: 'Wallet', name: 'walletId', value: null, custom_options: [], validations: [{ required: true }], sizeResponsive: 'md:col-6'
    },    // Más configuraciones...
];

export const TABLE_COLUMNS_BUDGET = [
    { field: 'name', header: 'Name' },
    { field: 'wallet.name', header: 'Wallet' },
    { field: 'category.name', header: 'Category' },
    { field: 'amount', header: 'Amount' },
    { field: 'date', header: 'Date' },
]
