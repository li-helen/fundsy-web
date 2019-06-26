const router = require('express').Router()
const {Category, User} = require('../db/models')
module.exports = router

router.post('/get-categories', async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            where: {
                userId: req.body.userId
            }
        })

        res.send(categories)
    } catch (err) {
        next(err)
    }
})

router.post('/add-category', async (req, res, next) => {
    try {
        const {userId, label} = req.body
        const newCat = await Category.create({label})
        const user = await User.findOne({
            where: {
                id: userId
        }})
        newCat.setUser(user)
        res.send(newCat)
    } catch (err) {
        next(err)
    }
  
})

router.put('/', async (req, res, next) => {
    try {
        const {id, label} = req.body
        const existingCat = await Category.findOne({
            where: {
                id
            }
        })
        existingCat.update({label})
        res.send(existingCat)
    } catch (err) {
        next(err)
    }
})

router.delete('/', async (req, res, next) => {
    try {
        const catToDelete = await Category.findOne({
            where: {
                id: req.body.id
            }
        })

        catToDelete.destroy()
        res.end()
    } catch (err) {
        next(err)
    }
})