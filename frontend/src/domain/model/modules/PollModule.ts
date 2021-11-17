import { BaseModule } from './BaseModule'
import { PollOption } from '../PollOption'

export class PollModule extends BaseModule {
    private question: string;
    private options: PollOption[] = [];

    constructor (moduleId: string, question: string, place = 0) {
      super(moduleId, 'poll', place)
      this.question = question
    }

    public addOption (optionText: string) {
      const option = new PollOption('', optionText)
      this.options.push(option)

      return this
    }

    public getOptions () {
      return this.options
    }

    public getQuestion () {
      return this.question
    }

    public setQuestion (question: string) {
        this.question = question
        return this
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
