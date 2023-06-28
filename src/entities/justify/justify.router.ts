import express from 'express'
import justify_controller from './justify.controller'
import { check_text_plain_type } from '../../utils/middlewares'
import my_passport from '../../utils/passport.config'

const router = express.Router()

router.post(
  '/',
  my_passport.authenticate('jwt', { session: false }),
  check_text_plain_type,
  justify_controller.justify_text
)

export default router
