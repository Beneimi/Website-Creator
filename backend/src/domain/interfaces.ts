import { DiscussionModuleDTO } from './DTO/modules/DiscussionModuleDTO'
import { GalleryModuleDTO } from './DTO/modules/GalleryModuleDTO'
import { TextModuleDTO } from './DTO/modules/TextModuleDTO'
import { PollModuleDTO } from './DTO/modules/PollModuleDTO'

export interface Equatable{
    isEqual(other: any): boolean;
}

export type ModuleType = 'text' | 'gallery' | 'video' | 'poll' | 'discussion'

export enum ModuleTypeEnum{
    TextModule = 'text',
    GalleryModule = 'gallery' ,
    VideoModule = 'video' , PollModule = 'poll',
    DiscussionModule = 'discussion'
}


export type ModuleDTO = PollModuleDTO | TextModuleDTO | DiscussionModuleDTO | GalleryModuleDTO
