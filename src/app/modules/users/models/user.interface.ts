export interface User {
    id?: number;
    name: string;
    email: string;
    phone: string;
    status?: UserStatusEnum;
}

export enum UserStatusEnum {
    ACTIVE = 'active',
    SOFT_DELETED = 'soft_deleted'
}