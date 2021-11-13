export class PollOptionDTO {
    _id: string;
    text: string;
    numberOfVotes: number;

    constructor (id: string, text: string, numberOfVotes: number) {
      this._id = id
      this.text = text
      this.numberOfVotes = numberOfVotes
    }
}
