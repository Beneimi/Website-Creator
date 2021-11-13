import { BaseModule } from './BaseModule'
import {prop} from "@typegoose/typegoose";

export class TextModule extends BaseModule {
    @prop()
    protected readonly _id: string;
    @prop()
    private content: string;

    constructor (moduleId: string, content = '') {
      super(moduleId, 'text')
      this.content = content
    }

    public setContent (content: string) {
      this.content = content
    }

    public getContent () {
      return this.content
    }
}
