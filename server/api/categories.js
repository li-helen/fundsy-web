const router = require('express').Router()
const {Category, User} = require('../db/models')
module.exports = router


router.post('/', async (req, res, next) => {
    const {userId, name} = req.body
    const newCategory = await Category.create({name})
    const user = await User.findOne({where: {
        id: userId
    }})
    await newCategory.setUser(user)
    res.send(newCategory)
})

router.put('/', (req, res, next) => {

})

router.delete('/', (req, res, next) => {

})