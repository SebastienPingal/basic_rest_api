import jwt from 'jsonwebtoken'

export default class token_helper {
    static is_token_expired(token: string) {
        const decoded_token = jwt.decode(token)
        if (!decoded_token) throw new Error('Token is invalid')
        const { exp } = decoded_token as { exp: number }
        const now = Date.now() / 1000
        if (exp < now) return true
        else return false
    }
}