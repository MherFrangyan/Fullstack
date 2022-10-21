const errorHandler = require('../utils/errorHandlers')
const Position = require('../models/Position')

module.exports.getCategoryById = async (req, res) => {
    try{
        const position = await Position.find({
            category: req.params.categoryId,
            user: req.user._id,
        })
            res.status(200).send(position)
     } catch (e) {
         errorHandler(res, e)
     }
}

module.exports.create = async (req, res) => {
    try{
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id,
        }).save()
        res.status(201).send(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) => {
    try{
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).send(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) => {
    try{
        await Position.remove({_id: req.params.id});
        res.status(200).send({
            message: 'Position has deleted'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
