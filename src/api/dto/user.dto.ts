export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'landlord' | 'tenant';
}

export type LoginUserDTO = {
    email: string;
    password: string;
}

export type UpdateUserDTO = CreateUserDTO