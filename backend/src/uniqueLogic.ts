import {PageRepository} from './repository/PageRepository';
import {inspect} from 'util';

export async function getUniquePageUrl(url:string) {
    let uniqueUrl = url;

    let foundPage = await PageRepository.getPagesByUrl(uniqueUrl);
    let index = 0;
    while (foundPage.length > 0) {
        console.log(inspect(foundPage));
        index++;
        uniqueUrl = `${url}-${index}`;
        foundPage = await PageRepository.getPagesByUrl(uniqueUrl);
    }

    return uniqueUrl;
}