import express from 'express'
import token_controller from './token.controller'

const router = express.Router()

router.post('/', (req, res) => {
    token_controller.provide_token(req, res) 
})

export default router