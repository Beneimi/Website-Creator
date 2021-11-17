import { VoteData } from '../interfaces'
import { PageRepository } from '../repository/PageRepository'

export class PollModuleService {
  public static async process (data: VoteData, token) {

    const page = await PageRepository.getPageById(data.pageId)

    const votedPage = page.voteForModule(data.moduleId, data.votedId)
    const updatedPage = await PageRepository.savePage(votedPage)
    return updatedPage.id
  }
}
