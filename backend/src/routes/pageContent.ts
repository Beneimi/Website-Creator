import { Router } from 'express'
import { verifyToken } from './verifyToken'
import { GetPageService } from '../services/GetPageService'
import { inspect } from 'util'
import {PageRepository} from "../repository/PageRepository";
import {UserRepository} from "../repository/UserRepository";
const router = Router()

router.get('/:userName/:pageUrl', async (req, res) => {
  try {
    console.log(inspect(req.params))
    const user = await UserRepository.getUserByUserName(req.params.userName)
    const page = await PageRepository.getPagesByOwnerAndUrl(user._id, req.params.pageUrl)
    console.log(inspect(page))
    res.send(page)
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 400).send(error.message)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const page = await GetPageService.process(req.params.id)
    res.status(200).send(page)
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 400).send(error.message)
  }
})

router.post('/:id/addModule', verifyToken, async (req, res) => {
  try {
    const page = await GetPageService.process(req.params.id)
    console.log('sending ' + inspect(page))
    res.status(200).send(page)
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 400).send(error.message)
  }
})

export const pageContentRoute = router
