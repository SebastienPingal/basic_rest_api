import { Request, Response, NextFunction } from 'express'
import user from '../models/user'

export function check_text_plain_type(req: Request, res: Response, next: NextFunction) {
    const contentType = req.headers['content-type']

    if (contentType !== 'text/plain') {
        return res.status(400).send('Server requires text/plain')
    } else {
        next()
    }
}
