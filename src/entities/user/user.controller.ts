import { Request, Response, json } from 'express'
import user from './user'

export default class user_controller {
    static async create_user(req: Request, res: Response) {
        try {
        const { email, password } = req.body;
            const new_user = await user.create_user(email, password)
            res.json(new_user)
        } catch (error) {
            res.json(error)
        }
    }

    static async get_user(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const this_user = await user.get_user(parseInt(id))
            res.json(this_user)
        } catch (error) {
            res.json(error)
        }
    }
    
}