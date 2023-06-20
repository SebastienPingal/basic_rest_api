import { Request, Response } from 'express'
import { RequestWithUser, User } from '../../../types'
import user from '../../models/user'
import justify_helper from "./justify.helper"

export default class justify_controller {
    static async justify_text(req: RequestWithUser, res: Response) {
        try {
            console.log('req.user: ', req.user)
            const this_user = req.user as User
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