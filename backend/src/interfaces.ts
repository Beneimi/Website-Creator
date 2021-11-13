import { Document } from 'mongoose'
import { User } from './domain/model/User'
import { DiscussionModuleDTO } from './domain/DTO/modules/DiscussionModuleDTO'
import { GalleryModuleDTO } from './domain/DTO/modules/GalleryModuleDTO'
import { TextModuleDTO } from './domain/DTO/modules/TextModuleDTO'
import { PollModuleDTO } from './domain/DTO/modules/PollModuleDTO'
import {BaseModule} from "./domain/model/modules/BaseModule";

export interface PageInterface{
    ownerId: string,
    title: string,
    content: string,
    url: string,
    modules:ModuleInterface[]
}

export interface ModuleInterface{
    type: ModuleType;
    place?: number;
}

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

export interface EditModuleData {
    token: string;
    pageId: string;
    module: ModuleDTO;
}

export interface DeleteModuleData {
    token: string;
    pageId: string;
    moduleId: string;
}

export interface VoteData {
    token: string;
    pageId: string;
    votedId: string;
    moduleId: string;
}

export interface Equatable{
    isEqual(other: any): boolean;
}

export type UserDAO = User & Document<any, any, User>

export type ModuleType = 'text' | 'gallery' | 'video' | 'poll' | 'discussion'

export type ModuleDTO = PollModuleDTO | TextModuleDTO | DiscussionModuleDTO | GalleryModuleDTO
