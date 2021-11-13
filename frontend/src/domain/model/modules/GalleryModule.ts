import { BaseModule } from './BaseModule'
import { Image } from '../Image'

export class GalleryModule extends BaseModule {
    private images: Image[] = [];

    constructor (moduleId: string) {
      super(moduleId, 'gallery')
    }

    public addImage (image: Image) {
      this.images.push(image)
    }

    public removeImage (image: Image) {
      this.images = this.images.filter(i => i.isEqual(image))
    }

    public getImages () {
      return this.images
    }

    public changeImageAlt (imageId: number, newAlt: string) {
      this.images.forEach(i => {
        if (i.getId() === imageId) {
          i.setAlt(newAlt)
        }
      })
    }
}
