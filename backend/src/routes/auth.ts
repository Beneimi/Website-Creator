import {Router} from 'express';
import {CreateUserService} from '../services/CreateUserService';
import {LoginUserService} from '../services/LoginUserService';
import {isTokenValid} from '../security';
import {getMillisecondByMinute} from '../../../frontend/src/utils';


const router = Router();

router.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        const saved = await CreateUserService.process(userData);
        res.status(200).send({user_id: saved._id});
    } catch (err) {
        res.status(err.statusCode || 400).send(err.message);
        console.log(err.message);
    }
});


router.post('/login', async (req, res) => {
    try {
        const loginData = req.body;
        const token = await LoginUserService.process(loginData);
        res.cookie('token', token, {
            expires: new Date(Date.now() + getMillisecondByMinute(1)),
            httpOnly: true
        })
            .send('Logged in');
    } catch (error) {
        res.status(error.statusCode || 400).send(error.message);
    }
});


router.post('/logout', async (req, res) => {
    const token = req.cookies['token'];
    const status = isTokenValid(token);
    console.log(status);
    res.status(200)
        .cookie('token', token, {
            expires: new Date(Date.now()),
            httpOnly: true})
        .send({loggedIn: status});
});


router.get('/status', async (req, res) => {
    const token = req.cookies['token'];
    const status = isTokenValid(token);
    console.log(status);
    res.status(200).send({loggedIn: status});
});

export const authRouter = router;