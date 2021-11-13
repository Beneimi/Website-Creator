import { BaseModuleDTO } from './BaseModuleDTO'
import { PollOptionDTO } from '../PollOptionDTO'
import { ModuleType } from '../../interfaces'

export class PollModuleDTO extends BaseModuleDTO {
   question: string;
   options: PollOptionDTO[];
   constructor (id: string, type: ModuleType, question: string, options:PollOptionDTO[], place?: number) {
     super(id, type, place)
     this.question = question
     this.options = options
   }
}
