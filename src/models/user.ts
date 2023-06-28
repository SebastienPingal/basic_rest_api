import prisma from '../utils/prisma.client'

export default class user {
  static async create_user (email: string) {
    try {
      if (!email) throw new Error()
      const user = await prisma.user.create({
        data: {
          email
        }
      })
      return user
    } catch (error) {
      throw new Error('Error while creating user')
    }
  }

  static async get_user (id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id
        }
      })
      if (user == null) throw new Error()
      return user
    } catch (error) {
      throw new Error('Error while getting user')
    }
  }

  static async get_user_by_email (email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if (user == null) throw new Error()
      return user
    } catch (error) {
      throw new Error('Error while getting user by email')
    }
  }

  static async set_user_word_count (id: number, word_count: number) {
    try {
      const user = await prisma.user.update({
        where: {
          id
        },
        data: {
          word_count
        }
      })
      return user
    } catch (error) {
      throw new Error('Error while setting user word count')
    }
  }

  static async set_user_word_cap (id: number, word_cap: number) {
    try {
      const user = await prisma.user.update({
        where: {
          id
        },
        data: {
          word_cap
        }
      })
      return user
    } catch (error) {
      throw new Error('Error while setting user word_cap')
    }
  }

  static async set_user_token (id: number, token: string) {
    try {
      const user = await prisma.user.update({
        where: {
          id
        },
        data: {
          token
        }
      })
      return user
    } catch (error) {
      throw new Error('Error while setting user token')
    }
  }

  static async delete_user (id: number) {
    try {
      const user = await prisma.user.delete({
        where: {
          id
        }
      })
      return user
    } catch (error) {
      throw new Error('Error while deleting user')
    }
  }
}
