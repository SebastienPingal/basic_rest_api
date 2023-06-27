import token_helper from "../../../src/entities/token/token.helper"
import jwt from 'jsonwebtoken'

describe("token_helper", () => {
    const jwtSecret = process.env.JWT_SECRET ?? 'truc'

    it("should return true if the token is expired", () => {
        const token = jwt.sign(
            { id: 1 },
            jwtSecret,
            { expiresIn: '-1s' }
        )
        const result = token_helper.is_token_expired(token)
        expect(result).toBe(true)
    })

    it("should return false if the token is not expired", () => {
        const token = jwt.sign(
            { id: 1 },
            jwtSecret,
            { expiresIn: '1s' }
        )
        const result = token_helper.is_token_expired(token)
        expect(result).toBe(false)
    })

    it("should throw an error if the token is invalid", () => {
        const token = 'invalid_token'
        expect(() => {
            token_helper.is_token_expired(token)
        }).toThrow('Token is invalid')
    })
})