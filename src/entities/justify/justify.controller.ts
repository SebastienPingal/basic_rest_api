import { Request, Response } from 'express'
import user from '../../models/user'
import justify_helper from "./justify.helper"
import type { User } from '../../../types'

export default class justify_controller {
    static async justify_text(req: Request, res: Response) {
        try {
            console.log('req.user: ', req.user)
            const this_user = req.user as User
            if (!this_user) throw new Error('User is required')

            const text = req.body
            let justified_text = ''
            const words_in_text = await justify_helper.count_words(text)
            const words_remaining = this_user.word_cap - this_user.word_count + words_in_text

            try {
                await justify_helper.check_user_quota(
                    this_user.word_cap,
                    this_user.word_count,
                    words_in_text
                )
            }
            catch (error) {
                const typed_error = error as Error
                res.status(402).json({ error: typed_error.message })
                return
            }

            justified_text = await justify_helper.justify_text(text)

            await user.update_user_word_count(
                this_user.id,
                (this_user.word_count + words_in_text)
            )
            res.json({ words_remaining, justified_text })

        } catch (error) {
            const typed_error = error as Error
            res.status(500).json({ error: typed_error.message })
        }
    }
}