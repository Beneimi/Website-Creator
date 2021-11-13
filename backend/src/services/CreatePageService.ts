import { CreatePageData } from '../interfaces'
import { getUserIdByJWToken } from '../security'
import { createValidation } from '../validation'
import { Page } from '../domain/model/Page'
import { HtmlError } from '../error/HtmlError'
import { UserRepository } from '../repository/UserRepository'
import { urlCleanString } from '../utils'
import { PageRepository } from '../repository/PageRepository'
import { getUniquePageUrl } from '../uniqueLogic'

export class CreatePageService {
  public static async process (data: CreatePageData, token) {
    const userId = getUserIdByJWToken(token)
    if (!userId) {
      throw new HtmlError(400, 'Invalid token')
    }

    try {
      const user = await UserRepository.getUserById(userId)
      UserRepository.updateUserRole(user, 'creator')
    } catch (err) {
      throw new HtmlError(400, 'User not found')
    }

    const validationResult = createValidation(data)
    if (validationResult.error) {
      throw new HtmlError(400, validationResult.error.details.map(d => d.message).join(', and '))
    }

    const pageUrl = await getUniquePageUrl(urlCleanString(data.title))

    const page = new Page(data.title, data.content, userId, pageUrl)

    try {
      const savedPage = await PageRepository.savePage(page)
      return savedPage as Page
    } catch (err) {
      throw new HtmlError(500, 'Page can not be saved')
    }

    throw new HtmlError(500, 'This should never happen')
  }
}
