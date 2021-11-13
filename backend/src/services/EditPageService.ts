import { EditModuleData } from '../interfaces'
import { HtmlError } from '../error/HtmlError'
import { PageRepository } from '../repository/PageRepository'
import { ValidateUserService } from './ValidateUserService'
import {BaseModule} from "../domain/model/modules/BaseModule";
import {ModuleMapper} from "../domain/mappers/ModuleMapper";
import {inspect} from "util";

export class EditPageService {
  public static async process (data: EditModuleData, token) {
    await ValidateUserService.process(token)

   // const dataValidationResult = editValidation(data)
    //if (dataValidationResult.error) {
   //   throw new HtmlError(400, dataValidationResult.error.details.map(d => d.message).join(', and '))
   // }

    try {
      const module = ModuleMapper.toDomain(data.module)

      await PageRepository.updatePageModule(data.pageId, module)
      return data.pageId
    } catch (err) {
      console.log(err)
      throw new HtmlError(500, 'Page can not be saved')
    }
  }
}
