import express from 'express'
import justify_controller from './justify.controller'
import { check_text_plain_type, token_auth} from '../../utils/middlewares'


const router = express.Router()

router.post(
    '/',
    check_text_plain_type,
    token_auth,
    justify_controller.justify_text
)

export default router