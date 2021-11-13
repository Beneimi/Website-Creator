import { BaseModule } from './modules/BaseModule'
import {prop} from "@typegoose/typegoose";
import {PollModule} from "./modules/PollModule";
import {ModuleTypeEnum} from "../interfaces";
import {TextModule} from "./modules/TextModule";
import {DiscussionModule} from "./modules/DiscussionModule";
import {GalleryModule} from "./modules/GalleryModule";

export class Page {
    @prop()
    content: string;
    @prop()
    ownerId: string;
    @prop()
    title: string;
    @prop()
    url: string;
    @prop({
        type: BaseModule,
        discriminators: () => [
            {type: PollModule, value: ModuleTypeEnum.PollModule},
            {type: TextModule, value: ModuleTypeEnum.TextModule},
            {type: DiscussionModule, value: ModuleTypeEnum.DiscussionModule},
            {type: GalleryModule, value: ModuleTypeEnum.GalleryModule},
        ],
        _id: true
    })
    modules: BaseModule[];

    constructor (title:string, content: string, ownerId: string, url: string) {
      this.content = content
      this.ownerId = ownerId
      this.title = title
      this.url = url
      this.modules = []
    }

    addModule (module: BaseModule) {
      if (this.modules.some(existingModule => existingModule.getId() === module.getId())) {
        throw new Error(`Module with id ${module.getId()} already exists, use updateModule() to modify it`)
      }
      this.modules.push(module)

      return this
    }

    updateModule (module: BaseModule) {
      const foundIndex = this.modules.findIndex(existingModule => existingModule.getId() === module.getId())
      if (foundIndex) {
        this.modules[foundIndex] = module
        return this
      }

      throw new Error(`Module with id ${module.getId()} not found, use addModule() to add it to the page`)
    }

    voteForModule(moduleId: string, optionId) {
        const foundIndex = this.modules.findIndex(m => m.getId() === moduleId)
        if(foundIndex !== -1) {
            if(this.modules[foundIndex].getType() !== ModuleTypeEnum.PollModule) {
                throw new Error('Module is not of type "Poll"')
            }
            this.modules[foundIndex] = (this.modules[foundIndex] as PollModule).voteForOption(optionId)
        }

        return this
    }
}
