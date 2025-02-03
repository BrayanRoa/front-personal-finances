import { FormFieldConfig } from "../../../shared/interfaces/generic-components/form.interface";

export const TABLE_COLUMNS_WALLET = [
    { field: 'name', header: 'Name' },
    { field: 'initial_balance', header: 'Initial Balance' },
    // { field: 'main_account', header: 'Main Account' },
    { field: 'balance', header: 'Balance' },
    { field: 'type_account', header: 'Type Account' },
];

export const FORM_CONFIG_WALLET: FormFieldConfig[] = [
    { type: 'text', label: 'Name', name: 'name', validations: [{ required: true }] },
    { type: 'text', label: 'Description', name: 'description', validations: [{ required: true }] },
    {
        type: 'text', label: 'Initial Balance', name: 'initial_balance', value: "0", validations: [{ required: false }], mask: {
            mask: 'separator.2',
            prefix: '$',
            thousandSeparator: ','
        },
    },
    {
        type: 'select', label: 'Type Account', name: 'type_account', value: "CREDIT", options: [
            { label: 'Credit', value: 'CREDIT' },
            { label: 'Debit', value: 'DEBIT' },
        ], validations: [{ required: true }],
    }
]


export const FORM_CONFIG_WALLET_UPDATE: FormFieldConfig[] = [
    { type: 'text', label: 'Name', name: 'name', validations: [{ required: true }] },
    { type: 'text', label: 'Description', name: 'description', validations: [{ required: true }] },
    {
        type: 'text', label: 'Initial Balance', name: 'initial_balance', value: "0", validations: [{ required: false }], mask: {
            mask: 'separator.2',
            prefix: '$',
            thousandSeparator: ','
        },
        disabled: true
    },
    {
        type: 'select', label: 'Type Account', name: 'type_account', value: "CREDIT", options: [
            { label: 'Credit', value: 'CREDIT' },
            { label: 'Debit', value: 'DEBIT' },
        ], validations: [{ required: true }],
    }
]