import { getUserIdByJWToken } from '../security'
import { HtmlError } from '../error/HtmlError'
import {PageRepository} from "../repository/PageRepository";

export class ValidateUserService {
  public static async process (token, pageId?:string) {
    const userId = getUserIdByJWToken(token)
    if (!userId) {
      throw new HtmlError(400, 'Invalid token')
    }
    if(pageId) {
      const page = await PageRepository.getPageById(pageId)
      if(page.ownerId !== userId) {
        throw new HtmlError(403, 'Access Denied')
      }
    }

    return true
  }
}
