import {Equatable} from '../interfaces';

export class Image implements Equatable{
    private readonly id: number;
    private readonly src: string;
    private alt?: string;
    
    constructor(id: number, src: string, alt?:string) {
        this.id = id;
        this.src = src;
        this.alt = alt;
    }

    public getId() {
        return this.id;
    }
    
    public getSrc() {
        return this.src;
    }
    
    public getAlt() {
        return this.alt;
    }
    
    public setAlt(alt: string) {
        this.alt = alt;
    }
    
    isEqual(other: Image) {
        return this.id === other.id && this.src === other.src;
    }
}