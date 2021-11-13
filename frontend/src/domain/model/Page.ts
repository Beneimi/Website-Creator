import { BaseModule } from './modules/BaseModule'

export class Page {
    _id: string;
    content: string;
    ownerId: string;
    title: string;
    url: string;
    modules: BaseModule[];

    constructor (_id: string, title:string, content: string, ownerId: string, url: string) {
      this._id = _id
      this.content = content
      this.ownerId = ownerId
      this.title = title
      this.url = url
      this.modules = []
    }

    addModule (module: BaseModule) {
      if (this.modules.some(existingModule => existingModule.getId() === module.getId())) {
          this.updateModule(module)
          return this
        //throw new Error(`Module with id ${module.getId()} already exists, use updateModule() to modify it`)
      }
      this.modules.push(module)

      return this
    }

    updateModule (module: BaseModule) {
      const foundIndex = this.modules.findIndex(existingModule => existingModule.getId() === module.getId())
      if (foundIndex !== -1) {
        this.modules[foundIndex] = module
        return this
      }

      return this.addModule(module)
    }

    deleteModule (moduleId: string) {
      const foundIndex = this.modules.findIndex(existingModule => existingModule.getId() === moduleId)
      if (foundIndex !== -1) {
        this.modules.splice(foundIndex, 1)
      }

      return this
    }
}
