export interface LoginResponse {
    data: {
        msg: string;
        token: string;
        name: string
    },
    status: number;
    statusMsg: string;
}

export interface Person {
    email: string;
    password: string;
}