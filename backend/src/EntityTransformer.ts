import {Document, Types} from 'mongoose';
import {Page} from './model/Page';

export class EntityTransformer {
    public static getPageDocument(page: Page) {
        console.log(page.ownerId);
        console.log({...page, ownerId: new Types.ObjectId(page.ownerId)});

        return {...page, ownerId: new Types.ObjectId(page.ownerId)};
    }

    public static getPageFromDocument(document: Page & Document) {
        return new Page(document.title, document.content, document.ownerId, document.url);
    }
}