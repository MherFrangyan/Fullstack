const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../configs/keys')
const errorHandlers = require('../utils/errorHandlers')


module.exports.login = async (req, res) => {
    const {email, password} = req.body
    const conditions =  await User.findOne({email: email})
    if (conditions) {
        //ka aydpisi user
        const passwordResult = bcrypt.compareSync(password, conditions.password)
        if (passwordResult) {
            //password hamapatasxanum e
            const token = await jwt.sign({
                email: conditions.email,
                userID: conditions._id
            }, keys.jwt,{expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            })

        } else {
            //paroly chi hamapatasxanum
            res.status(401).json({
                message: 'Password does not match'
            })
        }

    } else {
        //chka aydpisi user
        res.status(404).send({
            message: 'Email does not exist'
        })
    }
}

module.exports.register = async (req, res) => {
    const {email, password} = req.body
    const candidant = await User.findOne({email: email})
    console.log(candidant, 'candidant');
    if (candidant) {
        //erb email arden ka. krknvox e
        res.status(409).send({
            message: 'Email already exist'
        })
    } else {
        // client stexcum
        const salt = bcrypt.genSaltSync(10)
        const user = new User({
            email: email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(202).json({user})

        } catch (e) {
            errorHandlers(res, e)
        }

    }
    // const user = new User({
    //     email: email,
    //     password: password
    // })
    // user.save().then(() => console.log('User created'))
    // console.log(user);
}
