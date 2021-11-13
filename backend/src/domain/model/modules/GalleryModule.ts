import { BaseModule } from './BaseModule'
import { Image } from '../Image'
import {prop} from "@typegoose/typegoose";

export class GalleryModule extends BaseModule {
    @prop()
    protected readonly _id: string;
    @prop({type: () => Image})
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
