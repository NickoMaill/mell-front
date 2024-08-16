export type User = {
    id: number;
    name: string;
    userLevel: UserAccessLevel;
    email: string;
    mobile: string;
    token: string;
};

export enum UserAccessLevel {
    ADMIN = 0,
    USER = 1,
    VISITOR = 2,
}
