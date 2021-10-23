import {model, Schema, Document, Types} from 'mongoose';
import {Page} from '../model/Page';

const PageSchema = new Schema<Page>({
    ownerId: {
        type: Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
    url: {
        type: String,
        required: true,
    }
});

export const PageModel = model<Page>('Page', PageSchema);