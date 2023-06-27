import { check_text_plain_type } from '../../src/utils/middlewares'
import express from 'express'
import request from 'supertest'

describe("middlewares", () => {
    let app: express.Application
    beforeAll(() => {
        app = express()
        app.use(express.text({ type: 'text/plain' }))
        app.post('/', check_text_plain_type, (req, res) => {
            res.send('OK')
        })
    })

    it("should error if contentType is not text/plain", async () => {
        const response = await request(app)
            .post('/')
            .set('Content-Type', 'application/json')
            .send('Hello Bencheur')
            .expect(400)
        expect(response.text).toBe('Server requires text/plain')
    })

    it("should call next() if contentType is text/plain", async () => {
        const response = await request(app)
            .post('/')
            .set('Content-Type', 'text/plain')
            .send('Hello Bencheur')
            .expect(200)
    })
})