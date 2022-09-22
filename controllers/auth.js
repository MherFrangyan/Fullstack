const User = require('../models/User')
module.exports.login = (req, res) => {
    const {email, password} = req.body
    res.status(200).send({
        login: {
            email,
            password
        }
    })
}

module.exports.register = async (req, res) => {
    const {email, password} = req.body
    const candidant = await User.findOne({email: email})
    console.log(candidant, 'candidant');
    if (candidant) {
    //    erb email arden ka. krknvox e
        res.status(409).send({
            message: 'Email already exist'
        })
    } else {

    }
    // const user = new User({
    //     email: email,
    //     password: password
    // })
    // user.save().then(() => console.log('User created'))
    // console.log(user);
}
