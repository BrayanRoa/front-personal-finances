export interface ICategory {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    name: string;
    userId: string;
    _count: CountTransaction;
    color: IColor;
    icon: IIcon;
}

export interface CountTransaction {
    Transaction: number
}

export interface IColor {
    id: number;
    name: string;
    hex: string;
}

export interface IIcon {
    id: number;
    name: string;
    path: string;
}
