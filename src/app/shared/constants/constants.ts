export interface SelectInterface {
    label: string;
    value: string;
}

export const MONTHS: SelectInterface[] = [
    { label: 'January', value: '1' }, { label: 'February', value: '2' },
    { label: 'March', value: '3' }, { label: 'April', value: '4' },
    { label: 'May', value: '5' }, { label: 'June', value: '6' },
    { label: 'July', value: '7' }, { label: 'August', value: '8' },
    { label: 'September', value: '9' }, { label: 'October', value: '10' },
    { label: 'November', value: '11' }, { label: 'December', value: '12' }
];

export const PAGE: number = 1
export const PER_PAGE: number = 10