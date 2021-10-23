import {loginValidation} from '../validation';
import {UserModel} from '../schemas/UserSchema';
import * as bcrypt from 'bcryptjs';
import {UserLoginCredentials} from '../interfaces';
import {HtmlError} from '../error/HtmlError';
import {createJWToken} from '../security';

export class LoginUserService {
    public static async process(credentials: UserLoginCredentials){

        // Validation
        const validationResult = loginValidation(credentials);
        if (validationResult.error) {
            throw new HtmlError(400 ,validationResult.error.details.map(d => d.message).join(', and '));
        }

        // Check if user exists
        const user = await UserModel.findOne({email: credentials.email});
        if (!user) {
            throw new HtmlError(403,'Account does not exist with this email');
        }

        // Password check
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new HtmlError(403,'Wrong password');
        }

        // Create JWT
        return createJWToken(user._id);
    }
}