import { PageRepository } from '../repository/PageRepository'
import { HtmlError } from '../error/HtmlError'
import {Page} from "../domain/model/Page";

export class GetPageService {
  public static async process (pageId: string): Promise<Page> {
    const page = await PageRepository.getPageById(pageId)
    if (!page) {
      throw new HtmlError(400, 'Page not found')
    }

    return page
  }
}
