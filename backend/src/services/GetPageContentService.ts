import { UserRepository } from '../repository/UserRepository'
import { PageRepository } from '../repository/PageRepository'
import { HtmlError } from '../error/HtmlError'

export class GetPageService {
  public static async process (userName, pageUrl) {
    const user = await UserRepository.getUserByUserName(userName)
    if (!user) {
      throw new HtmlError(400, 'User not found')
    }
    const userPages = await PageRepository.getPagesByOwner(user._id)
    const foundPage = userPages.find(page => page.url === pageUrl)

    if (!foundPage) {
      throw new HtmlError(404, 'page not found')
    }

    return foundPage.content
  }
}
