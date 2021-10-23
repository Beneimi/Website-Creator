import {Router} from 'express';
import {GetPageContentService} from '../services/GetPageContentService';
const router = Router();

router.get('/:userName/:pageUrl', async (req, res) => {
    try {
        const content = await GetPageContentService.process(req.params.userName, req.params.pageUrl);
        res.send(content);
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 400).send(error.message);
    }

});

export const pageContentRoute = router;