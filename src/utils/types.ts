import { Gender } from "./constants";

export type ValidateUserDetails = {
    id?: number;
    email: string;
    password: string;
};

export type UserDetails = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    avatarLink?: string;
    phone?: string;
    dob?: string;
    gender?: Gender;
};

export type FindUserParams = {
    email?: string;
    name?: string;
    phone?: string;
};

export type JwtPayload = {
    email: string;
    sub: number;
};
