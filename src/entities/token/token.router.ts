import express from 'express'
import token_controller from './token.controller'

const router = express.Router()

router.post('/', token_controller.provide_token)

export default router
