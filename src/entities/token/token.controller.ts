import { Request, Response} from 'express'
import user from '../../models/user'
import jwt from 'jsonwebtoken'

export default class token_controller {
    static async provide_token(req: Request, res: Response) {
        try {
            const { email } = req.body;
            if (!email) throw new Error('Email is required')
            
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) throw new Error('JWT_SECRET is not defined')

            const this_user = await user.get_user_by_email(email) || await user.create_user(email)
            const token = jwt.sign(
                { id: this_user.id },
                jwtSecret,
                { expiresIn: '24h' }
            )
            res.json({ token })

        } catch (error) {
            const typed_error = error as Error
            res.status(500).json({ error: typed_error.message })
        }
    }
}