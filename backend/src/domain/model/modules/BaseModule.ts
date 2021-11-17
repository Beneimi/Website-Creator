import { ModuleType } from '../../interfaces'
import {modelOptions, prop} from "@typegoose/typegoose";
import * as mongoose from "mongoose";

@modelOptions({
    schemaOptions:{
        discriminatorKey: 'type',
        _id: true
    }
})
export class BaseModule {
    protected readonly _id: string;
    @prop()
    protected readonly type: ModuleType;
    @prop()
    protected place?: number;

    constructor (moduleId: string, type: ModuleType, place = 0) {
        this._id = moduleId || new mongoose.Types.ObjectId().toString()
        this.type = type
        this.place = place
    }

    public setPlace (place: number) {
      this.place = place
    }

    public getType () {
      return this.type
    }

    public getId () {
      return this._id
    }

    public getPlace () {
      return this.place
    }
}
