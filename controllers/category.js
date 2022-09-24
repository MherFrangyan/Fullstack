const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandlers')

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find({user: req.user.id})
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Category.remove({_id: req.params._id})
        await Position.remove({category: req.params._id})
        res.status(200).json({
            message: "Category has deleted"
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) => {
    try {
        console.log(req);
        const category = await new Category({
             name: req.body.name,
             user: req.user.id,
             imageSrc: req.file ? req.file.path : ''
         }).save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) => {
    const updated = {
        name: req.body.name,
    }
    if(req.file) {
       updated.imageSrc = req.file.path;
    }
    try {
        const categoryUpdate = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(categoryUpdate)
    } catch (e) {
        errorHandler(res, e)
    }
}
