export interface User {
    id?: number;
    userNumber: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    phoneNumber: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
