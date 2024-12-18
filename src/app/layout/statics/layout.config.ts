import { FormFieldConfig } from "../../shared/interfaces/generic-components/form.interface";

export const THEMES = [
    {
        id: 'saga-blue',
        label: 'saga-blue'
    },
    {
        id: 'vela-blue',
        label: 'vela-blue'
    },
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