import {Document} from "mongoose";
import {User} from "./model/User";

export interface NewUserData {
    email: string;
    password: string;
    name: string;
}

export interface UserLoginCredentials {
    email: string;
    password: string;
}

export interface UserEmail {
    email: string;
}

export interface CreatePageData {
    token: string;
    title: string;
    content: string;
}

export interface Equatable{
    isEqual(other): boolean;
}

export type UserDAO = User & Document<any, any, User>

export type ModuleType = 'text' | 'gallery' | 'video' | 'poll' | 'discussion'