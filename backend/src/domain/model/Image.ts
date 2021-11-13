import { Equatable } from '../interfaces'
import {prop} from "@typegoose/typegoose";

export class Image implements Equatable {
    @prop()
    private readonly id: number;
    @prop()
    private readonly src: string;
    @prop()
    private alt?: string;

    constructor (id: number, src: string, alt?:string) {
      this.id = id
      this.src = src
      this.alt = alt
    }

    public getId () {
      return this.id
    }

    public getSrc () {
      return this.src
    }

    public getAlt () {
      return this.alt
    }

    public setAlt (alt: string) {
      this.alt = alt
    }

    isEqual (other: Image) {
      return this.id === other.id && this.src === other.src
    }
}
