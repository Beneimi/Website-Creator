import {Router} from 'express';
import {verifyToken} from './verifyToken';
import {ListPagesService} from '../services/ListPagesService';
import {CreatePageService} from '../services/CreatePageService';


const router = Router();

router.get('/', verifyToken, async (req, res) => {
    try {
        const userEmail = req.body;
        const pages = await ListPagesService.process(userEmail);
        res.status(200).send(pages);
    } catch (error) {
        console.log(error.message);
        res.status(error.statusCode || 400).send(error.message);
    }
});

router.post('/create', verifyToken, async (req, res) => {
    try {
        const pageData = req.body;
        const token = req.cookies['token'];
        const pageId = await CreatePageService.process(pageData, token);
        res.status(200).send(pageId);
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 400).send(error.message);
    }

});

export const pagesRoute = router;