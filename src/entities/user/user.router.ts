import express from 'express'
import user_controller from './user.controller'

const router = express.Router()

router.post('/', (req, res) => {
    const { email, password } = req.body;
    user_controller.create_user(email, password) 
})

export default router