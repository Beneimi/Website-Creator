import { BaseModuleDTO } from './modules/BaseModuleDTO'

export class PageDTO {
    _id: string;
    content: string;
    ownerId: string;
    title: string;
    url: string;
    modules: BaseModuleDTO[];

    constructor (id: string, content: string, ownerId: string, title: string, url: string, modules: BaseModuleDTO[]) {
      this._id = id
      this.content = content
      this.ownerId = ownerId
      this.title = title
      this.url = url
      this.modules = modules
    }
}
