import { ModuleType } from '../../interfaces'

export class BaseModuleDTO {
    _id: string;
    type: ModuleType;
    place?: number;
    constructor (id: string, type: ModuleType, place?: number) {
      this._id = id
      this.place = place
      this.type = type
    }
}
