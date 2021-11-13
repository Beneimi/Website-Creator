import { ModuleType } from '../../interfaces'
import {ModuleInterface} from "../../../interfaces";

export class BaseModuleDTO implements ModuleInterface{
    _id: string;
    type: ModuleType;
    place?: number;
    constructor (id: string, type: ModuleType, place?: number) {
      this._id = id
      this.place = place
      this.type = type
    }
}
