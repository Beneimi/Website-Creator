import { BaseModuleDTO } from './modules/BaseModuleDTO'
import {ModuleInterface, PageInterface} from "../../interfaces";

export class PageDTO implements PageInterface{
    _id: string;
    content: string;
    ownerId: string;
    title: string;
    url: string;
    modules: ModuleInterface[];

    constructor (id: string, content: string, ownerId: string, title: string, url: string, modules: BaseModuleDTO[]) {
      this._id = id
      this.content = content
      this.ownerId = ownerId
      this.title = title
      this.url = url
      this.modules = modules
    }
}
