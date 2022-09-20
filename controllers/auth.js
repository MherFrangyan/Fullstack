module.exports.login = (req, res) => {
    res.status(200).json({
        login: req.body
    })

}

module.exports.register = (req, res) => {
    res.status(200).json({
        register: 'User Register'
    })
}
