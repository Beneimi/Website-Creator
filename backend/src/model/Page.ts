import {BaseModule} from './modules/BaseModule';

export class Page{
    content: string;
    ownerId: string;
    title: string;
    url: string;
    modules: BaseModule[];

    constructor(title:string, content: string, ownerId: string, url: string) {
        this.content = content;
        this.ownerId = ownerId;
        this.title = title;
        this.url = url;
        this.modules = [];
    }
}