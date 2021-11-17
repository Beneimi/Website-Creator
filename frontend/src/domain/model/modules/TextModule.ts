import { BaseModule } from './BaseModule'

export class TextModule extends BaseModule {
    private content: string;

    constructor (moduleId: string, content = '', place = 0) {
        super(moduleId, 'text', place)
        this.content = content

    }

    public setContent (content: string) {
        this.content = content

        return this
    }

    public getContent () {
        return this.content
    }
}
