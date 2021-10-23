import {Router} from 'express';
import {verifyToken} from './verifyToken';
import {getUserIdByJWToken, } from '../security';
import {UserRepository} from '../repository/UserRepository';
import {PageRepository} from '../repository/PageRepository';
const router = Router();


router.get('/', verifyToken, async (req, res) => {
    const token = req.cookies['token'];
    const userId = getUserIdByJWToken(token);

    const user = await UserRepository.getUserById(userId);
    const pages = await PageRepository.getPagesByOwner(userId);

    res.send({user: {email: user.email, name: user.name, role: user.role}, pages: pages.map(page => page.title)});
});

export const userPageRoute = router;