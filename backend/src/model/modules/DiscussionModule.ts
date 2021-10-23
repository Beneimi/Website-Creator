import {BaseModule} from './BaseModule';
import {Comment} from '../Comment';

export class DiscussionModule extends BaseModule {
    private readonly starter: string;
    private comments: Comment[] = []

    constructor(pageId: string, moduleId: number, starter: string) {
        super(pageId, moduleId, 'discussion');
        this.starter = starter;
    }

    public getStarter(){
        return this.starter;
    }

    public getComments(){
        return this.comments;
    }
    
    public postComment(userId: string, text: string) {
        const comment = new Comment(this.getNumberOfComments(), userId, text, this.getNumberOfComments());
        this.comments.push(comment);
    }
    
    public likeComment(commentId: number) {
        let liked = false;
        const comments = this.getComments();
        comments.forEach(c => {
            if(c.getId() === commentId) {
                c.like();
                liked = true;
            }
        });
        if(!liked) {
            throw new Error(`Comment with id ${commentId} not found`);
        }
    }
    
    private getNumberOfComments() {
        return this.comments.length;
    }

}