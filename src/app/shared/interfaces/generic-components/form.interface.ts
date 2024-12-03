export interface FormFieldConfig {
    type: 'text' | 'number' | 'email' | 'password' | 'select' | 'date';
    label: string;
    name: string;
    value?: any;
    options?: { label: string; value: any }[]; // Para selects
    validations?: any[]; // Array de validadores de Angular
    mask?:{
        mask:string; //
        prefix?: string; //
        thousandSeparator?: string; //
    }
}
