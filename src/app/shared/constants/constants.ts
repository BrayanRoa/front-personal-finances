export interface SelectInterface {
    name: string;
    id: string;
    shortcut?: string;
}

// esto no se usa para nada pero es bueno tenerlo 
export const CURRENCY: SelectInterface[] = [
    { name: 'USD', id: 'USD' }, { name: 'EUR', id: 'EUR' }, { name: 'GBP', id: 'GBP' },
    { name: 'JPY', id: 'JPY' }, { name: 'CHF', id: 'CHF' }, { name: 'AUD', id: 'AUD' },
]

export const MONTHS: SelectInterface[] = [
    { name: 'January', id: '1', shortcut:'Jan' }, { name: 'February', id: '2', shortcut:'Feb' },
    { name: 'March', id: '3', shortcut:'Mar' }, { name: 'April', id: '4', shortcut:'Apr' },
    { name: 'May', id: '5', shortcut:'May' }, { name: 'June', id: '6', shortcut:'Jun' },
    { name: 'July', id: '7', shortcut:'Jul' }, { name: 'August', id: '8', shortcut:'Aug' },
    { name: 'September', id: '9', shortcut:'Sep' }, { name: 'October', id: '10', shortcut:'Oct' },
    { name: 'November', id: '11', shortcut:'Nov' }, { name: 'December', id: '12', shortcut:'Dec' },
];

export const PAGE: number = 1
export const PER_PAGE: number = 10
export const NOT_FOUND_MSG: string = 'No data available at this time.'

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
export const FORMATTEDDATE = localDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
