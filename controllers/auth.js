module.exports.login = (req, res) => {
    const {email, password} = req.body
    res.status(200).send({
        login: {
            email,
            password
        }
    })
}

module.exports.register = (req, res) => {
    res.status(200).json({
        register: 'User Register'
    })
}
