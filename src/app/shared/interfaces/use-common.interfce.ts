export interface actionsButton {
    type: 'button' | 'submit' | 'reset',
    color: 'help' | 'info' | 'danger' | 'warning' | 'secondary' | 'success' | 'contrast' | 'primary',
    label: string,
    icon?: string,
    callback: (row: any) => void
}