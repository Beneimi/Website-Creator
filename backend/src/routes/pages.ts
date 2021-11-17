import { Router } from 'express'
import { verifyToken } from './verifyToken'
import { ListPagesService } from '../services/ListPagesService'
import { CreatePageService } from '../services/CreatePageService'
import { EditPageService } from '../services/EditPageService'
import {PollModuleService} from "../services/PollModuleService";
import {AddModuleService} from "../services/AddModuleService";
import {DeletePageService} from "../services/DeletePageService";
import {DeleteModuleService} from "../services/DeleteModuleService";

const router = Router()

router.get('/', verifyToken, async (req, res) => {
  try {
    const userEmail = req.body
    const pages = await ListPagesService.process(userEmail)
    res.status(200).send(pages)
  } catch (error) {
    console.log(error.message)
    res.status(error.statusCode || 400).send(error.message)
  }
})

router.post('/create', verifyToken, async (req, res) => {
  try {
    const pageData = req.body
    const token = req.cookies.token
    const page = await CreatePageService.process(pageData, token)
    res.status(200).send(page)
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 400).send(error.message)
  }
})

router.post('/edit', verifyToken, async (req, res) => {
  try {
    const pageData = req.body
    const token = req.cookies.token
    const pageId = await EditPageService.process(pageData, token)
    res.status(200).send(pageId)
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 400).send(error.message)
  }
})

router.delete('/delete/:pageId', verifyToken, async (req, res) => {
  try {
    const pageId = req.params.pageId
    const token = req.cookies.token
    await DeletePageService.process(pageId, token)
    res.status(200).send(pageId)
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 400).send(error.message)
  }
})

router.post('/addModule', verifyToken, async (req, res) => {
  try {
    const pageData = req.body
    const token = req.cookies.token
    const pageId = await AddModuleService.process(pageData, token)
    res.status(200).send(pageId)
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 400).send(error.message)
  }
})

router.post('/deleteModule', verifyToken, async (req, res) => {
  try {
    const data = req.body
    const token = req.cookies.token
    const pageId = await DeleteModuleService.process(data, token)
    res.status(200).send(pageId)
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 400).send(error.message)
  }
})

router.post('/vote', async (req, res) => {
  try {
    const pageData = req.body
    const token = req.cookies.token
    const pageId = await PollModuleService.process(pageData, token)
    res.status(200).send(pageId)
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 400).send(error.message)
  }
})

export const pagesRoute = router
