export interface CategoryInterface{
    id: number,
    name: string,
    icon: string,
    color?: string // colocar este campo en el backend
    created_at: string,
    updated_at: string,
    deleted_at: string | null,
    userId: string
}