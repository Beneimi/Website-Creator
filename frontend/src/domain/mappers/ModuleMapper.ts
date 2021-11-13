import { Mapper } from './Mapper'
import { BaseModule } from '../model/modules/BaseModule'
import { BaseModuleDTO } from '../DTO/modules/BaseModuleDTO'
import { PollModuleDTO } from '../DTO/modules/PollModuleDTO'
import { PollModule } from '../model/modules/PollModule'
import { PollOption } from '../model/PollOption'
import { TextModule } from '../model/modules/TextModule'
import { TextModuleDTO } from '../DTO/modules/TextModuleDTO'
import { ModuleDTO } from '../interfaces'
import { PollOptionDTO } from '../DTO/PollOptionDTO'

export class ModuleMapper extends Mapper<BaseModule> {
  static toDomain(moduleDTO: BaseModuleDTO): BaseModule {
    let module
    switch (moduleDTO.type) {
      case 'poll': {
        const pollModuleDTO = moduleDTO as PollModuleDTO
        module = new PollModule(pollModuleDTO._id, pollModuleDTO.question)
            .setOptions(pollModuleDTO.options.map(
                optionDTO => new PollOption(optionDTO._id, optionDTO.text, optionDTO.numberOfVotes)))
        break
      }
      case 'text' : {
        module = new TextModule(moduleDTO._id, (moduleDTO as TextModuleDTO).content)
        break
      }
    }

    if (!module) {
      throw new Error('Unknown module type ' + moduleDTO.type)
    }

    return module
  }

  static toDTO(module: BaseModule): ModuleDTO {
    switch (module.getType()) {
      case 'poll': {
        const pollModule = module as PollModule
        return new PollModuleDTO(
            pollModule.getId(),
            pollModule.getType(),
            pollModule.getQuestion(),
            pollModule.getOptions().map(
                pollOption => new PollOptionDTO(
                    pollOption.getId(),
                    pollOption.getText(),
                    pollOption.getNumberOfVotes())),
            pollModule.getPlace())
      }
      case 'text' : {
        const textModule = module as TextModule

        return new TextModuleDTO(
            textModule.getId(),
            textModule.getType(),
            textModule.getContent(),
            textModule.getPlace())
      }
    }

    throw new Error('This module is not of a valid type')
  }
}