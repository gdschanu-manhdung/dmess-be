import { Gender } from './constants';

export type ValidateUserDetails = {
    id?: number;
    email: string;
    password: string;
};

export type UserDetail = {
    id?: number;
    email?: string;
    password?: string;
    name?: string;
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
