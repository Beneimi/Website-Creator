import {PageModel} from '../schemas/PageSchema';
import {EntityTransformer} from '../EntityTransformer';
import {Page} from '../model/Page';


export class PageRepository {
    public static async getPageById(id: string) {
        return PageModel.findById(id);
    }

    public static async getPagesByUrl(url: string) {
        return PageModel.find({url: url});
    }
    
    public static async getPagesByOwner(owner: string) {
        return PageModel.find({ownerId: owner});
    }
    
    public static async savePage(page: Page) {
        const newPage = new PageModel(EntityTransformer.getPageDocument(page));
        return newPage.save();
    }
}