export class Comment {
    private readonly id: number;
    private readonly userId: string;
    private readonly text: string;
    private readonly order: number;
    private numberOfLikes: number;

    constructor(id: number, userId: string, text:string, order: number) {
        this.text = text;
        this.userId = userId;
        this.id = id;
        this.order = order;
        this.numberOfLikes = 0;
    }

    public getUserId() {
        return this.userId;
    }

    public getId() {
        return this.id;
    }

    public getText() {
        return this.text;
    }

    public getOrder() {
        return this.order;
    }

    public getNumberOfLikes() {
        return this.numberOfLikes;
    }

    public like() {
        return this.numberOfLikes++;
    }
}