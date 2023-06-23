import { Request, Response, NextFunction } from 'express'

export async function check_text_plain_type(req: Request, res: Response, next: NextFunction) {
    const contentType = req.headers['content-type']

    if (contentType !== 'text/plain') {
        console.log('check_text_plain_type: 400')
        return res.status(400).send('Server requires text/plain')
    } else {
        console.log('check_text_plain_type: next()')
        next()
    }
}
