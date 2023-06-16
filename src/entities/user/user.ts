import prisma from '../../utils/prisma.client'

export default class user {
    static async create_user(email: string, password: string) {
        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    password
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

    static async get_all_users() {
        try {
            const users = await prisma.user.findMany()
            return users
        } catch (error) {
            throw new Error('Error while getting users')
        }
    }

    static async update_user(id: number, email: string, password: string) {
        try {
            const user = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    email,
                    password
                }
            })
            return user
        } catch (error) {
            throw new Error('Error while updating user')
        }
    }

    static async delete_user(id: number) {
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

    static async delete_all_users() {
        try {
            const users = await prisma.user.deleteMany()
            return users
        } catch (error) {
            throw new Error('Error while deleting users')
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

    static async set_user_password(id: number, password: string) {
        try {
            const user = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    password
                }
            })
            return user
        } catch (error) {
            throw new Error('Error while setting user password')
        }
    }

    static async set_user_email(id: number, email: string) {
        try {
            const user = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    email
                }
            })
            return user
        } catch (error) {
            throw new Error('Error while setting user email')
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