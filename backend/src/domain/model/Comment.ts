import {prop} from "@typegoose/typegoose";

export class Comment {
    @prop()
    private readonly id: number;
    @prop()
    private readonly userId: string;
    @prop()
    private readonly text: string;
    @prop()
    private readonly order: number;
    @prop()
    private numberOfLikes: number;

    constructor (id: number, userId: string, text:string, order: number) {
      this.text = text
      this.userId = userId
      this.id = id
      this.order = order
      this.numberOfLikes = 0
    }

    public getUserId () {
      return this.userId
    }

    public getId () {
      return this.id
    }

    public getText () {
      return this.text
    }

    public getOrder () {
      return this.order
    }

    public getNumberOfLikes () {
      return this.numberOfLikes
    }

    public like () {
      return this.numberOfLikes++
    }
}
