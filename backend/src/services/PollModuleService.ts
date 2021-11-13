import { VoteData } from '../interfaces'
import { PageRepository } from '../repository/PageRepository'
import { ValidateUserService } from './ValidateUserService'
import {inspect} from "util";

export class PollModuleService {
  public static async process (data: VoteData, token) {
    await ValidateUserService.process(token)
    console.log('----------------------------')
    console.log('----------------------------')

    console.log(inspect(data))

    const page = await PageRepository.getPageById(data.pageId)
    console.log('----------------------------')

    console.log(inspect(page))
    console.log('----------------------------')

    const votedPage = page.voteForModule(data.moduleId, data.votedId)
    console.log('----------------------------')

    console.log(inspect(votedPage))
    const updatedPage = await PageRepository.savePage(votedPage)
    return updatedPage.id
  }
}
