import { Request, Response, NextFunction } from 'express'
import { RequestWithUser } from '../../types'
import user from '../models/user'

export function check_text_plain_type(req: Request, res: Response, next: NextFunction) {
    const contentType = req.headers['content-type']

    if (contentType !== 'text/plain') {
        return res.status(400).send('Server requires text/plain')
    } else {
        next()
    }
}

export async function token_auth(req: RequestWithUser, res: Response, next: NextFunction) {
    const auth_header = req.headers.authorization;
    const bearer_token = auth_header as string
    let token = bearer_token.slice(7)

    if (!token) {
        return res.status(403).json({ error: "No token provided" })
    }

    try {
        console.log('token: ', token)
        req.user = await user.get_user_by_token(token)

        if (req.user === null) {
            throw new Error("User not found");
        }

        console.log('User is authenticated')
        next()
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" })
    }
}