import {prop} from "@typegoose/typegoose";
import * as mongoose from "mongoose";

export class PollOption {
    @prop()
    private readonly _id: string;
    @prop()
    private readonly text: string;
    @prop()
    private numberOfVotes: number;

    constructor (id: string, text: string, numberOfVotes = 0) {
      this._id = id || new mongoose.Types.ObjectId().toString()
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
