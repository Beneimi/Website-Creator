import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

interface DecodedToken{
    _id: string;
    iat: number;
}

export function createJWToken(userId: string) {
    return jwt.sign({_id: userId}, process.env.TOKEN_SECRET);
}

export function getUserIdByJWToken(token: string): string|undefined {
    const decoded = jwt.decode(token) as DecodedToken;
    if(!decoded?._id) {
        return null;
    }
    return decoded._id;
}

export function isTokenValid(token: string): boolean {
    const decoded = jwt.decode(token) as DecodedToken;
    if(!decoded?._id) {
        return false;
    }
    return true;
}

export async function getHashedPassword(rawPassword: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(rawPassword, salt);
}