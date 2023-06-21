import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport'
import user  from '../models/user';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const my_passport = passport.use(
    new JwtStrategy(options, async (payload, done) => {

        try {
            const this_user = await user.get_user(payload.id)
            if (!this_user) return done(null, false)
            return done(null, this_user)
        } catch (error) {
            return done(error, false)
        }
    })
)

export default my_passport