module.exports.getAll = (req, res) => {
    res.status(200).json({
        text: 'order get all'
    })
}

module.exports.create = (req, res) => {
    res.status(200).json({
        text: 'Created order'
    })
}
