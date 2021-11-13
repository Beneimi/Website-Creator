export class CommentDTO {
    _id: number;
    userId: string;
    text: string;
    order: number;
    numberOfLikes: number;

    constructor (id: number, userId: string, text: string, order: number, numberOfLikes: number) {
      this._id = id
      this.userId = userId
      this.text = text
      this.order = order
      this.numberOfLikes = numberOfLikes
    }
}
