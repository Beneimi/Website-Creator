export type ModuleType = 'text' | 'gallery' | 'video' | 'poll' | 'discussion'

export interface Equatable{
    isEqual(other: any): boolean;
}