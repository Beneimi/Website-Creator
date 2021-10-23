import {emailValidation} from '../validation';
import {UserRepository} from '../repository/UserRepository';
import {UserEmail} from '../interfaces';
import {HtmlError} from '../error/HtmlError';
import {PageRepository} from '../repository/PageRepository';
import {EntityTransformer} from "../EntityTransformer";

export class ListPagesService {
    public static async process(userEmail:UserEmail){
        if(emailValidation(userEmail).error) {
            throw new HtmlError(400,'invalid user email');
        }

        const user = await UserRepository.getUserByEmail(userEmail.email);
        
        if(!user) {
            throw new HtmlError(400,'No user found with this email');
        }

        const pages = await PageRepository.getPagesByOwner(user._id);

        return pages.map(page => EntityTransformer.getPageFromDocument(page));
    }
}