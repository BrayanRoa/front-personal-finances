import { FormFieldConfig } from "../../shared/interfaces/generic-components/form.interface";

export const FORM_CONFIG_LOGIN: FormFieldConfig[] = [
    { type: 'email', label: 'Email', name: 'email', validations: [{ required: true }], sizeResponsive: 'col-12' },
    { type: 'password', label: 'password', name: 'password', validations: [{ required: true }], sizeResponsive: 'col-12' },
]



export const FORM_CONFIG_REGISTER: FormFieldConfig[] = [
    { type: 'text', label: 'Name and lastname', name: 'name', validations: [{ required: true }], sizeResponsive: 'col-12' },
    { type: 'email', label: 'Email', name: 'email', validations: [{ required: true }], sizeResponsive: 'col-12' },
    { type: 'password', label: 'Password', name: 'password', validations: [{ required: true }], sizeResponsive: 'md:col-6' },
    { type: 'password', label: 'Confirm Password', name: 'confirm', validations: [{ required: true }], sizeResponsive: 'md:col-6' },
]