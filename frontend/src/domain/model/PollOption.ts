export class PollOption {
    private readonly _id: string;
    private readonly text: string;
    private numberOfVotes: number;

    constructor (id: string, text: string, numberOfVotes = 0) {
      this._id = id
      this.text = text
      this.numberOfVotes = numberOfVotes
    }

    public vote () {
      this.numberOfVotes++
      return this
    }

    public getNumberOfVotes () {
      return this.numberOfVotes
    }

    public getText () {
      return this.text
    }

    public getId (): string {
      return this._id
    }
}
