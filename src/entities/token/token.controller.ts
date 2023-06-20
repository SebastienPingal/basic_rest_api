import { Request, Response, json} from 'express'
import user from '../../models/user'

export default class token_controller {
    static async provide_token(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const this_user = await user.get_user_by_email(email) || await user.create_user(email)
            const token = this_user.token
            res.json({ token })

        } catch (error) {
            const typed_error = error as Error
            res.status(500).json({ error: typed_error.message })
        }
    }
}