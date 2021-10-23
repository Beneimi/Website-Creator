import {BaseModule} from './BaseModule';
import {PollOption} from '../PollOption';

export class PollModule extends BaseModule {
    private question: string;
    private options: PollOption[] = [];

    constructor(pageId: string, moduleId: number, question: string) {
        super(pageId, moduleId, 'poll');
        this.question = question;
    }

    public addOption(optionText: string) {
        const option = new PollOption(this.getNumberOfOptions(), optionText);
        this.options.push(option);
    }

    public getOptions() {
        return this.options;
    }

    public getWinningOption(): PollOption | null {
        if(this.getNumberOfOptions() === 0) {
            return null;
        }
        const options = this.getOptions();
        let winning = options[0];
        options.forEach(o => {
            if(o.getNumberOfVotes() > winning.getNumberOfVotes()) {
                winning = o;
            }
        });

        return winning;
    }

    public voteForOption(optionId: number) {
        let voted = false;
        this.options.forEach(o => {
            if(o.getId() === optionId){
                o.vote();
                voted = true;
            }
        });
        if(!voted) {
            throw new Error('There is no Option with the given Id');
        }
    }
    
    private getNumberOfOptions(){
        return this.options.length;
    }

}