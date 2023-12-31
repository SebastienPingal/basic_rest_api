import { type Request, type Response } from 'express'
import user from '../../models/user'
import jwt from 'jsonwebtoken'
import token_helper from './token.helper'

export default class token_controller {
  static async provide_token (req: Request, res: Response) {
    try {
      console.log('+++++ provide_token +++++')

      const { email } = req.body
      if (!email) throw new Error('Email is required')
      console.log('email: ', email)

      let this_user
      try {
        this_user = await user.get_user_by_email(email)
      } catch (error) {
        this_user = await user.create_user(email)
      }

      let token = ''

      if (!this_user.token || token_helper.is_token_expired(this_user.token)) {
        console.log('Either no token or token is expired. Creating new token.')

        const jwtSecret = process.env.JWT_SECRET ?? 'mysecret869'
        token = jwt.sign(
          { id: this_user.id },
          jwtSecret,
          { expiresIn: '24h' }
        )
        await user.set_user_token(this_user.id, token)
        await user.set_user_word_count(this_user.id, 0)
      } else {
        token = this_user.token
      }

      console.log('+++++ provide_token +++++')
      res.json({ token })
    } catch (error) {
      const typed_error = error as Error
      console.log('error: ', typed_error.message)
      res.status(500).json({ error: typed_error.message })
    }
  }
}
