import { FormFieldConfig } from '../../../shared/interfaces/generic-components/form.interface';

export const FORM_CONFIG: FormFieldConfig[] = [
    { type: 'text', label: 'Name', name: 'name', validations: [{ required: true }], sizeResponsive: 'md:col-3' },
    { type: 'text', label: 'Description', name: 'description', validations: [{ required: false }], sizeResponsive: 'md:col-6' },
    {
        type: 'text', label: 'Amount', name: 'amount', value: 0, validations: [{ required: true }], mask: {
            mask: 'separator.2',
            prefix: '$',
            thousandSeparator: ','
        },
        sizeResponsive: 'md:col-3'
    },
    { type: 'date', label: 'Date', name: 'date', value: new Date(), validations: [{ required: true }], sizeResponsive: 'md:col-4' },
    {
        type: 'select', label: 'Type', name: 'type', options: [
            { label: 'Income', value: 'INCOME' },
            { label: 'Outflow', value: 'OUTFLOW' },
        ], validations: [{ required: true }], sizeResponsive: 'md:col-4'
    },
    {
        type: 'select', label: 'Repeat', name: 'repeat', options: [
            { label: 'No Repeat', value: 'NEVER' },
            { label: 'Every Day', value: 'EVERY DAY' },
            { label: 'Every Two Days', value: 'EVERY TWO DAYS' },
            { label: 'Every Working Day', value: 'EVERY WORKING DAY' },
            { label: 'Every Week', value: 'EVERY WEEK' },
            { label: 'Every Two Weeks', value: 'EVERY TWO WEEKS' },
            { label: 'Every Month', value: 'EVERY MONTH' },
            { label: 'Every Two Months', value: 'EVERY TWO MONTHS' },
            { label: 'Every Three Months', value: 'EVERY THREE MONTHS' },
            { label: 'Every Six Months', value: 'EVERY SIX MONTHS' },
            { label: 'Every Year', value: 'EVERY YEAR' },
        ], validations: [{ required: true }], sizeResponsive: 'md:col-4'
    },
    {
        type: 'select', label: 'Category', name: 'categoryId', options: [], validations: [{ required: true }], sizeResponsive: 'md:col-6'
    },
    {
        type: 'select', label: 'Wallet', name: 'walletId', options: [], validations: [{ required: true }], sizeResponsive: 'md:col-6'
    },    // Más configuraciones...
];

export const TABLE_COLUMNS = [
    { field: 'name', header: 'Name' },
    { field: 'category.name', header: 'Category' },
    { field: 'amount', header: 'Amount' },
    { field: 'date', header: 'Date' },
    { field: 'type', header: 'Type' },
    { field: 'repeat', header: 'Repeat' },
];
