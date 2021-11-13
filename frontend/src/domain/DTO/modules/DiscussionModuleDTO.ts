import { BaseModuleDTO } from './BaseModuleDTO'
import { CommentDTO } from '../CommentDTO'
import { ModuleType } from '../../interfaces'

export class DiscussionModuleDTO extends BaseModuleDTO {
    starter: string;
    comments: CommentDTO[];
    constructor (id: string, type: ModuleType, starter: string, comments:CommentDTO[], place?: number) {
      super(id, type, place)
      this.starter = starter
      this.comments = comments
    }
}
