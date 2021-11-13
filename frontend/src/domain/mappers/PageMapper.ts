import { Page } from '../model/Page'
import { Mapper } from './Mapper'
import { PageDTO } from '../DTO/PageDTO'
import { ModuleMapper } from './ModuleMapper'
import {BaseModuleDTO} from "../DTO/modules/BaseModuleDTO";

export class PageMapper extends Mapper<Page> {
  static toDomain (pageDTO: PageDTO): Page {
    let page = new Page(pageDTO._id, pageDTO.title, pageDTO.content, pageDTO.ownerId, pageDTO.url)
    pageDTO.modules.forEach(moduleDTO => {
      const module = ModuleMapper.toDomain(moduleDTO)
      page = page.addModule(module)
    })

    return page
  }

  static toDTO (page: Page): PageDTO {
    const modules:BaseModuleDTO[] = []
    page.modules.forEach(module => {
      modules.push(ModuleMapper.toDTO(module))
    })

    return new PageDTO(page._id, page.content, page.ownerId, page.title, page.url, modules)
  }
}
