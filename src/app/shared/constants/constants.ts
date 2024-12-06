export interface SelectInterface {
    name: string;
    id: string;
}

export const MONTHS: SelectInterface[] = [
    { name: 'January', id: '1' }, { name: 'February', id: '2' },
    { name: 'March', id: '3' }, { name: 'April', id: '4' },
    { name: 'May', id: '5' }, { name: 'June', id: '6' },
    { name: 'July', id: '7' }, { name: 'August', id: '8' },
    { name: 'September', id: '9' }, { name: 'October', id: '10' },
    { name: 'November', id: '11' }, { name: 'December', id: '12' }
];

export const PAGE: number = 1
export const PER_PAGE: number = 10
export const NOT_FOUND_MSG: string = 'No data available at this time.'

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
export const FORMATTEDDATE = localDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
