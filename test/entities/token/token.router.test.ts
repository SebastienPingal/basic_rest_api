import token_router from '../../../src/entities/token/token.router'
import token_controller_class from '../../../src/entities/token/token.controller'
import express from 'express'
import request from 'supertest'

jest.mock('../../../src/entities/token/token.controller')

describe('token_router', () => {
  let app: express.Application
  const mock_provide_token = token_controller_class.provide_token as jest.Mock

  beforeAll(() => {
    app = express()
    app.use(express.json())
    app.use(token_router)
  })

  it('should trigger toke_controller', async () => {
    mock_provide_token.mockImplementationOnce((req: express.Request, res: express.Response) => {
      res.json({ test: 'test' })
    })

    const response = await request(app)
      .post('/')
      .send({ email: 'jest@jest.jest' })
      .expect(200)

    expect(mock_provide_token).toHaveBeenCalledTimes(1)
    expect(response.body).toEqual({ test: 'test' })
  })
})
