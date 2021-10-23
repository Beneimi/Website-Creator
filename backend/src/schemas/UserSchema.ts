import {model, Schema, Document} from 'mongoose';
import {User} from '../model/User';

export const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        min: 5
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    role: {
        type: String,
        required: true,
    }

});

export const UserModel = model<User>('User', UserSchema);
