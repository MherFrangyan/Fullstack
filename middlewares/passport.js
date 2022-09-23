const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../configs/keys')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = function (passport) {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                console.log(payload,'payload');
                const user = await User.findById(payload.userID).select('email id')
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}
