import { EditModuleData } from '../interfaces'
import { HtmlError } from '../error/HtmlError'
import { PageRepository } from '../repository/PageRepository'
import { ValidateUserService } from './ValidateUserService'
import {BaseModule} from "../domain/model/modules/BaseModule";
import {ModuleMapper} from "../domain/mappers/ModuleMapper";
import {inspect} from "util";

export class AddModuleService {
    public static async process (data: EditModuleData, token) {
        await ValidateUserService.process(token)

        console.log('-----------------------------------------------------')
        console.log(inspect(data.module))
        console.log('-----------------------------------------------------')
        const module = ModuleMapper.toDomain(data.module)

        await PageRepository.addModule(data.pageId, module)

        return data.pageId
    }
}
