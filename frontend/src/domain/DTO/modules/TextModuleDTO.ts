import { BaseModuleDTO } from './BaseModuleDTO'
import { ModuleType } from '../../interfaces'

export class TextModuleDTO extends BaseModuleDTO {
    content: string;
    constructor (id: string, type: ModuleType, content: string, place?: number) {
      super(id, type, place)
      this.content = content
    }
}
