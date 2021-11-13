import {DeleteModuleData, EditModuleData} from '../interfaces'
import { HtmlError } from '../error/HtmlError'
import { PageRepository } from '../repository/PageRepository'
import { ValidateUserService } from './ValidateUserService'
import {BaseModule} from "../domain/model/modules/BaseModule";
import {ModuleMapper} from "../domain/mappers/ModuleMapper";

export class DeleteModuleService {
    public static async process (data: DeleteModuleData, token) {
        await ValidateUserService.process(token)

        await PageRepository.deletePageModule(data.pageId, data.moduleId)

        return data.pageId
    }
}
