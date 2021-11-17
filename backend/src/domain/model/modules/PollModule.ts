import { BaseModule } from './BaseModule'
import { PollOption } from '../PollOption'
import {prop} from "@typegoose/typegoose";

export class PollModule extends BaseModule {
    @prop()
    protected readonly _id: string;
    @prop()
    private question: string;
    @prop({type: () => PollOption})
    private options: PollOption[] = [];

    constructor (moduleId: string, question: string, place = 0) {
      super(moduleId, 'poll', place)
      this.question = question
    }

    public addOption (optionText: string) {
      const option = new PollOption('asd', optionText)
      this.options.push(option)

      return this
    }

    public getOptions () {
      return this.options
    }

    public getQuestion () {
      return this.question
    }

    public getWinningOption (): PollOption | null {
      if (this.getNumberOfOptions() === 0) {
        return null
      }
      const options = this.getOptions()
      let winning = options[0]
      options.forEach(o => {
        if (o.getNumberOfVotes() > winning.getNumberOfVotes()) {
          winning = o
        }
      })

      return winning
    }

    public voteForOption (optionId: string) {
      let voted = false
      this.options = this.options.map(option => {

        const currentOptionId: string = option.getId()
        if (currentOptionId.toString() === optionId.trim()) {
          voted = true

          return option.vote()
        }

        return option
      })
      if (!voted) {
        throw new Error('There is no Option with the given Id')
      }

      return this
    }

    private getNumberOfOptions () {
      return this.options.length
    }

    public setOptions (options: PollOption[]) {
      this.options = options

      return this
    }
}
