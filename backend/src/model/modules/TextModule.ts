import {BaseModule} from './BaseModule';

export class TextModule extends BaseModule {
    private content: string;

    constructor(pageId: string, moduleId: number) {
        super(pageId, moduleId, 'text');
        this.content = '';
    }

    public setContent(content: string) {
        this.content = content;
    }

    public getContent() {
        return this.content;
    }
}