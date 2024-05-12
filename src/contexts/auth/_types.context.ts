

export interface Auth {
    token: string;
    user: User;
}

export interface User {
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}