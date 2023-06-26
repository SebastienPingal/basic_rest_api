import justify_router from "../../../src/entities/justify/justify.router"
import request from "supertest"
import { Request, Response, NextFunction } from "express"
import express from "express"
import justify_controller_class from "../../../src/entities/justify/justify.controller"
import { check_text_plain_type } from "../../../src/utils/middlewares"
import jwt from "jsonwebtoken"

jest.mock('../../../src/entities/justify/justify.controller')
jest.mock('../../../src/utils/middlewares')

let token = ''
const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) throw new Error('JWT_SECRET is not defined')

describe("justify_router", () => {
    let app: express.Application
    const mock_check_text_plain_type = check_text_plain_type as jest.Mock
    const mock_justify_text = justify_controller_class.justify_text as jest.Mock

    beforeAll(async () => {
        app = express()
        app.use(express.text({ type: 'text/plain' }))
        app.use(justify_router)
        token = jwt.sign(
            { id: 1 },
            jwtSecret,
            { expiresIn: '24h' }
        )
    })

    it("should trigger all the middleware and then the controller", async () => {
        mock_check_text_plain_type.mockImplementationOnce((req: Request, res: Response, next: NextFunction) => {
            next()
        })
        mock_justify_text.mockImplementationOnce((req: Request, res: Response) => {
            res.json({})
        })

        await request(app)
            .post('/')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'text/plain')
            .send('This is a test')
            .expect(200)
            
        expect(mock_check_text_plain_type).toHaveBeenCalledTimes(1)
        expect(mock_justify_text).toHaveBeenCalledTimes(1)
            
    })

    it("should return 401 if no token is provided", async () => {
        await request(app)
            .post('/')
            .set('Content-Type', 'text/plain')
            .send('This is a test')
            .expect(401)
    })

    it("should return 401 if the token is invalid", async () => {
        await request(app)
            .post('/')
            .set('Authorization', `Bearer invalid_token`)
            .set('Content-Type', 'text/plain')
            .send('This is a test')
            .expect(401)
    })
})