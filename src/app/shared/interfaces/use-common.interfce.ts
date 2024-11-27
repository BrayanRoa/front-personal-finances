export interface actionsButton {
    type: 'button' | 'submit' | 'reset',
    color: 'primary' | 'secondary' | 'danger' | 'success',
    label: string,
    icon?: string,
    callback: (row: any) => void
}