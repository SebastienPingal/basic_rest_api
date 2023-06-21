import prisma from '../utils/prisma.client'

export default class user {
    static async create_user(email: string) {
        try {
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

    static async get_user(id: number) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
            return user
        } catch (error) {
            throw new Error('Error while getting user')
        }
    }

    static async get_user_by_email(email: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            return user
        } catch (error) {
            throw new Error('Error while getting user by email')
        }
    }

    static async update_user_word_count(id: number, word_count: number) {
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
            throw new Error('Error while updating user word count')
        }
    }

    static async set_user_word_cap(id: number, word_cap: number) {
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
            throw new Error('Error while setting user cap')
        }
    }
}