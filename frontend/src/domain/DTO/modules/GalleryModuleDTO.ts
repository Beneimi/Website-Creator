import { BaseModuleDTO } from './BaseModuleDTO'
import { ImageDTO } from '../ImageDTO'
import { ModuleType } from '../../interfaces'

export class GalleryModuleDTO extends BaseModuleDTO {
    images: ImageDTO[];
    constructor (id: string, type: ModuleType, images: ImageDTO[], place?: number) {
      super(id, type, place)
      this.images = images
    }
}
