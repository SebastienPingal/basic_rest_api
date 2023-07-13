import justify_controller from '../../../src/entities/justify/justify.controller'
import request from 'supertest'
import express, { type Request, type Response, type NextFunction } from 'express'
import justify_helper_class from '../../../src/entities/justify/justify.helper'

jest.mock('../../../src/entities/justify/justify.helper')
jest.mock('../../../src/models/user')

describe('justify_controller', () => {
  let app: express.Application
  const mock_count_words = justify_helper_class.count_words as jest.Mock
  const mock_justify_text = justify_helper_class.justify_text as jest.Mock
  const mock_check_user_quota = justify_helper_class.check_user_quota as jest.Mock

  const mock_user = {
    id: 1,
    email: 'bob@bob.bob',
    word_cap: 80000,
    word_count: 0
  }
  function define_mock_user (req: Request, res: Response, next: NextFunction) {
    req.user = mock_user
    next()
  }

  beforeAll(() => {
    app = express()
    app.use(express.text({ type: 'text/plain' }))
    app.post('/', define_mock_user, justify_controller.justify_text)
    app.post('/no_user', justify_controller.justify_text)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should error if user exceed his word cap', async () => {
    mock_user.word_count = 80000
    mock_check_user_quota.mockImplementation(() => {
      throw new Error('Payment Required')
    })

    const response = await request(app)
      .post('/')
      .set('Content-Type', 'text/plain')
      .send('Hello Bencheur')
      .expect(402)
    expect(response.body.error).toBe('Payment Required')
  })

  it('should error 500 if user is not defined', async () => {
    const response = await request(app)
      .post('/no_user')
      .set('Content-Type', 'text/plain')
      .send('Hello Bencheur')
      .expect(500)
    expect(response.body.error).toBe('User is required')
  })

  it('should return the justified text and the words remaining', async () => {
    mock_user.word_count = 0
    mock_check_user_quota.mockReturnValue(true)
    mock_count_words.mockReturnValue(4)
    mock_justify_text.mockReturnValue('C\'est  justifié')

    const response = await request(app)
      .post('/')
      .set('Content-Type', 'text/plain')
      .send("Ce n'est pas justifié")
      .expect(200)
    expect(response.body.justified_text).toBe('C\'est  justifié')
    expect(response.body.words_remaining).toBe(79996)
  })
})
