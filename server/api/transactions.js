const router = require('express').Router()
const {Transaction} = require('../db/models')
const Sequelize = require('sequelize')

router.post('/categorized', async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({
            where: {
                userId: req.body.userId,
                category: {
                    [Sequelize.Op.ne]: null
                }
            }
        })

        res.send(transactions)
    } catch(err) {
        next(err)
    }
})

router.post('/uncategorized', async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({
            where: {
                userId: req.body.userId,
                category: null
            }
        })

        res.send(transactions)
    } catch(err) {
        next(err)
    }
})

module.exports = router
