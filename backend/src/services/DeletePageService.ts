import { EditModuleData } from '../interfaces'
import { HtmlError } from '../error/HtmlError'
import { PageRepository } from '../repository/PageRepository'
import { ValidateUserService } from './ValidateUserService'
import {BaseModule} from "../domain/model/modules/BaseModule";
import {ModuleMapper} from "../domain/mappers/ModuleMapper";

export class DeletePageService {
    public static async process (pageId: string , token) {
        await ValidateUserService.process(token)

        try {
            await PageRepository.deletePageById(pageId)
            return pageId
        } catch (err) {
            console.log(err)
            throw new HtmlError(500, 'Page can not be deleted')
        }
    }
}
