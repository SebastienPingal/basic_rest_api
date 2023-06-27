import user from '../../src/models/user'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) throw new Error('JWT_SECRET is not defined')

describe("user.create_user", () => {
    it("should create a user", async () => {
        const random_email = Math.random().toString(36).substring(7)
        const new_user = await user.create_user(random_email)
        expect(new_user.email).toEqual(random_email)
        user.delete_user(new_user.id)
    })

    it("should throw an error if email is not provided", async () => {
        await expect(user.create_user('')).rejects.toThrow('Error while creating user')
    })
})

describe("user.get_user", () => {
    it("should get a user", async () => {
        const random_email = Math.random().toString(36).substring(7)
        const new_user = await user.create_user(random_email)
        const found_user = await user.get_user(new_user.id)
        expect(found_user?.email).toEqual(random_email)
        user.delete_user(new_user.id)
    })

    it("should throw an error if user does not exist", async () => {
        await expect(user.get_user(0)).rejects.toThrow('Error while getting user')
    })

    it("should throw an error if id is not a number", async () => {
        await expect(user.get_user(NaN)).rejects.toThrow('Error while getting user')
    })
})

describe("user.get_user_by_email", () => {
    it("should get a user", async () => {
        const random_email = Math.random().toString(36).substring(7)
        const new_user = await user.create_user(random_email)
        const found_user = await user.get_user_by_email(random_email)
        expect(found_user?.email).toEqual(random_email)
        user.delete_user(new_user.id)
    })

    it("should error if user does not exist", async () => {
        await expect(user.get_user_by_email('asw;ijdbfvlodisab')).rejects.toThrow('Error while getting user by email')
    })
})

describe("user.set_user_word_count", () => {
    it("should set a user's word count", async () => {
        const random_email = Math.random().toString(36).substring(7)
        const new_user = await user.create_user(random_email)
        const updated_user = await user.set_user_word_count(new_user.id, 1000)
        expect(updated_user?.word_count).toEqual(1000)
        user.delete_user(new_user.id)
    })

    it("should error if user does not exist", async () => {
        await expect(user.set_user_word_count(0, 1000)).rejects.toThrow('Error while setting user word count')
    })
})

describe("user.set_user_word_cap", () => { 
    it("should set a user's word cap", async () => {
        const random_email = Math.random().toString(36).substring(7)
        const new_user = await user.create_user(random_email)
        const updated_user = await user.set_user_word_cap(new_user.id, 1000)
        expect(updated_user?.word_cap).toEqual(1000)
        user.delete_user(new_user.id)
    })

    it("should error if user does not exist", async () => {
        await expect(user.set_user_word_cap(0, 1000)).rejects.toThrow('Error while setting user word_cap')
    })
})

describe("user.set_user_token", () => {
    
    it("should set a user's token", async () => {
        const token = jwt.sign(
        { id: 1 },
        jwtSecret,
        { expiresIn: '24h' }
        )
        const random_email = Math.random().toString(36).substring(7)
        const new_user = await user.create_user(random_email)
        const updated_user = await user.set_user_token(new_user.id, token)
        expect(updated_user?.token).toEqual(token)
        user.delete_user(new_user.id)
    })

    it("should error if user does not exist", async () => {
        await expect(user.set_user_token(0, 'test')).rejects.toThrow('Error while setting user token')
    })
})

describe("user.delete_user", () => {
    it("should delete a user", async () => {
        const random_email = Math.random().toString(36).substring(7)
        const new_user = await user.create_user(random_email)
        const deleted_user = await user.delete_user(new_user.id)
        expect(deleted_user?.email).toEqual(random_email)
    })

    it("should error if user does not exist", async () => {
        await expect(user.delete_user(0)).rejects.toThrow('Error while deleting user')
    })
})