export interface actionsButton<T> {
    type: 'button' | 'submit' | 'reset',
    color: 'help' | 'info' | 'danger' | 'warning' | 'secondary' | 'success' | 'contrast' | 'primary',
    label: string,
    icon?: string,
    callback: (row: any, data: T) => void
}