import user from '../../src/models/user'
import prisma from '../../src/utils/prisma.client'

const mock_user = { id: 1, email: 'jest@jest.jest', word_count: 1000, word_cap: 1000, token: 'jestyjestjest', created_at: new Date() }

beforeEach(() => {
  jest.clearAllMocks()
})

describe('user.create_user', () => {
  it('should create a user', async () => {
    jest.spyOn(prisma.user, 'create').mockResolvedValue(mock_user)

    const new_user = await user.create_user(mock_user.email)
    expect(new_user).toEqual(mock_user)
    expect(prisma.user.create).toHaveBeenCalledWith({ data: { email: mock_user.email } })
  })

  it('should throw an error if email is not provided', async () => {
    jest.spyOn(prisma.user, 'create').mockRejectedValue(new Error('Error while creating user'))
    await expect(user.create_user('')).rejects.toThrow('Error while creating user')
  })
})

describe('user.get_user', () => {
  it('should get a user', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mock_user)

    const found_user = await user.get_user(mock_user.id)
    expect(found_user).toEqual(mock_user)
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: mock_user.id } })
  })

  it('should throw an error if user does not exist', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Error while getting user'))
    await expect(user.get_user(0)).rejects.toThrow('Error while getting user')
  })

  it('should throw an error if id is not a number', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Error while getting user'))
    await expect(user.get_user(NaN)).rejects.toThrow('Error while getting user')
  })
})

describe('user.get_user_by_email', () => {
  it('should get a user', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mock_user)

    const found_user = await user.get_user_by_email(mock_user.email)
    expect(found_user).toEqual(mock_user)
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: mock_user.email } })
  })

  it('should error if user does not exist', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Error while getting user by email'))
    await expect(user.get_user_by_email('asw;ijdbfvlodisab')).rejects.toThrow('Error while getting user by email')
  })
})

describe('user.set_user_word_count', () => {
  it("should set a user's word count", async () => {
    jest.spyOn(prisma.user, 'update').mockResolvedValue(mock_user)

    const updated_user = await user.set_user_word_count(mock_user.id, 1000)
    expect(updated_user?.word_count).toEqual(1000)
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: mock_user.id }, data: { word_count: 1000 } })
  })

  it('should error if user does not exist', async () => {
    jest.spyOn(prisma.user, 'update').mockRejectedValue(new Error('Error while setting user word count'))
    await expect(user.set_user_word_count(0, 1000)).rejects.toThrow('Error while setting user word count')
  })
})

describe('user.set_user_word_cap', () => {
  it("should set a user's word cap", async () => {
    jest.spyOn(prisma.user, 'update').mockResolvedValue(mock_user)

    const updated_user = await user.set_user_word_cap(mock_user.id, 1000)
    expect(updated_user?.word_cap).toEqual(1000)
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: mock_user.id }, data: { word_cap: 1000 } })
  })

  it('should error if user does not exist', async () => {
    jest.spyOn(prisma.user, 'update').mockRejectedValue(new Error('Error while setting user word_cap'))
    await expect(user.set_user_word_cap(0, 1000)).rejects.toThrow('Error while setting user word_cap')
  })
})

describe('user.set_user_token', () => {
  it("should set a user's token", async () => {
    const token = 'jestyjestjest'
    jest.spyOn(prisma.user, 'update').mockResolvedValue(mock_user)

    const updated_user = await user.set_user_token(mock_user.id, token)
    expect(updated_user?.token).toEqual(token)
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: mock_user.id }, data: { token } })
  })

  it('should error if user does not exist', async () => {
    jest.spyOn(prisma.user, 'update').mockRejectedValue(new Error('Error while setting user token'))
    await expect(user.set_user_token(0, 'test')).rejects.toThrow('Error while setting user token')
  })
})

describe('user.delete_user', () => {
  it('should delete a user', async () => {
    jest.spyOn(prisma.user, 'delete').mockResolvedValue(mock_user)

    const deleted_user = await user.delete_user(mock_user.id)
    expect(deleted_user).toEqual(mock_user)
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: mock_user.id } })
  })

  it('should error if user does not exist', async () => {
    jest.spyOn(prisma.user, 'delete').mockRejectedValue(new Error('Error while deleting user'))
    await expect(user.delete_user(0)).rejects.toThrow('Error while deleting user')
  })
})
