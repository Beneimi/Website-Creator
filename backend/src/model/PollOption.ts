export class PollOption {
    private readonly id: number;
    private readonly text: string;
    private numberOfVotes: number;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
        this.numberOfVotes = 0;
    }

    public vote() {
        this.numberOfVotes++;
    }

    public getNumberOfVotes() {
        return this.numberOfVotes;
    }

    public getText() {
        return this.text;
    }

    public getId() {
        return this.id;
    }
}