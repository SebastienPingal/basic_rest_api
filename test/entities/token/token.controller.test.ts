import token_controller from '../../../src/entities/token/token.controller'
import token_helper from '../../../src/entities/token/token.helper'
import user from '../../../src/models/user'
import express from 'express'
import request from 'supertest'

jest.mock('../../../src/entities/token/token.helper')
jest.mock('../../../src/models/user')

describe('token_controller', () => {
  let app: express.Application
  const mock_get_user_by_email = user.get_user_by_email as jest.Mock
  const mock_create_user = user.create_user as jest.Mock
  const mock_set_user_token = user.set_user_token as jest.Mock
  const mock_set_user_word_count = user.set_user_word_count as jest.Mock
  const mock_is_token_expired = token_helper.is_token_expired as jest.Mock
  let originalJwtSecret: string | undefined

  beforeAll(() => {
    app = express()
    app.use(express.json())
    app.post('/', token_controller.provide_token)
    originalJwtSecret = process.env.JWT_SECRET
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    if (originalJwtSecret) process.env.JWT_SECRET = originalJwtSecret
  })

  it('should create a new user and create a token', async () => {
    mock_get_user_by_email.mockImplementation(() => {
      return undefined
    })
    mock_create_user.mockResolvedValue({ id: 1 })
    mock_is_token_expired.mockReturnValue(true)
    mock_set_user_token.mockResolvedValue(null)
    mock_set_user_word_count.mockResolvedValue(null)

    const response = await request(app)
      .post('/')
      .send({ email: 'jest@jest.jest' })
      .expect(200)

    expect(mock_create_user).toHaveBeenCalledTimes(1)
    expect(mock_is_token_expired).toHaveBeenCalledTimes(0)
    expect(mock_set_user_token).toHaveBeenCalledTimes(1)
    expect(mock_set_user_word_count).toHaveBeenCalledTimes(1)
    expect(response.body.token).toBeTruthy()
    expect(mock_get_user_by_email).toHaveBeenCalledTimes(1)
  })

  it('should return an existing token', async () => {
    mock_get_user_by_email.mockImplementation((email) => {
      return { id: 777, email, token: 'token' }
    })
    mock_is_token_expired.mockImplementation(() => {
      return false
    })

    const response = await request(app)
      .post('/')
      .send({ email: 'jest@jest.jest' })
      .expect(200)

    expect(mock_get_user_by_email).toHaveBeenCalledTimes(1)
    expect(mock_create_user).toHaveBeenCalledTimes(0)
    expect(mock_is_token_expired).toHaveBeenCalledTimes(1)
    expect(mock_set_user_word_count).toHaveBeenCalledTimes(0)
    expect(response.body.token).toBe('token')
    expect(mock_set_user_token).toHaveBeenCalledTimes(0)
  })

  it('should generate a new token if the existing token is expired', async () => {
    mock_get_user_by_email.mockImplementation((email) => {
      return { id: 777, email, token: 'token' }
    })
    mock_is_token_expired.mockImplementation(() => {
      return true
    })
    mock_set_user_token.mockResolvedValue(null)
    mock_set_user_word_count.mockResolvedValue(null)

    const response = await request(app)
      .post('/')
      .send({ email: 'jest@jest.jest' })
      .expect(200)

    expect(mock_get_user_by_email).toHaveBeenCalledTimes(1)
    expect(mock_create_user).toHaveBeenCalledTimes(0)
    expect(mock_is_token_expired).toHaveBeenCalledTimes(1)
    expect(mock_set_user_token).toHaveBeenCalledTimes(1)
    expect(mock_set_user_word_count).toHaveBeenCalledTimes(1)
    expect(response.body.token).toBeTruthy()
  })

  it('should return an error if email is not provided', async () => {
    const response = await request(app)
      .post('/')
      .send({})
      .expect(500)

    expect(response.body.error).toBe('Email is required')
  })

  it('should return an error if JWT_SECRET is not defined', async () => {
    delete process.env.JWT_SECRET
    await request(app)
      .post('/')
      .send({ email: 'jest@jest.jest' })
      .expect(500)
  })
})
