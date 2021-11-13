import { PageModel } from '../schemas/Models'
import { Page } from '../domain/model/Page'
import {BaseModule} from "../domain/model/modules/BaseModule";
import * as mongoose from "mongoose";
import {inspect} from "util";

export class PageRepository {
  public static async getPageById (id: string) {
    return PageModel.findById(new mongoose.Types.ObjectId(id.trim())).exec()
  }

  public static async deletePageById (id: string) {
    return PageModel.findByIdAndDelete(new mongoose.Types.ObjectId(id.trim())).exec()
  }

  public static async getPagesByUrl (url: string) {
    return PageModel.find({ url })
  }

  public static async getPagesByOwner (owner: string) {
    return PageModel.find({ ownerId: owner })
  }

  public static async getPagesByOwnerAndUrl (owner: string, url: string) {
    return PageModel.findOne({ ownerId: owner, url: url})
  }

  public static async savePage (page: Page) {
    return new PageModel(page).save()
  }

  public static async addModule (pageId: string, module: BaseModule){
    const page = await PageModel.findById(pageId)
    page.modules.push(module)

    return page.save()
  }

  public static async updatePageModule (pageId: string, updatedModule: BaseModule) {
    PageModel.findById(pageId, undefined, undefined, (err, doc) => {
      const index = doc.modules.findIndex(m => (m as BaseModule).getId() === updatedModule.getId())
      if(index !== -1) {
        doc.modules[index] = updatedModule
      }

      doc.save()
    })
  }

  public static async getModule (pageId: string, moduleId: string) {
    const page = await PageModel.findById(pageId)
    return page.modules.find(m => m.getId() === moduleId)
  }

  public static async deletePageModule (pageId: string, moduleId: string) {
    PageModel.findById(pageId, undefined, undefined, (err, doc) => {
      const index = doc.modules.findIndex(m => (m as BaseModule).getId() === moduleId)
      if(index !== -1) {
        doc.modules.splice(index, 1)
      }

      doc.save()
    })
  }
}
