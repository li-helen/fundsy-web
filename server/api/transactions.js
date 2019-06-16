const router = require('express').Router()
const {Transaction} = require('../db/models')
const Sequelize = require('sequelize')

const PER_PAGE = 10

router.post('/categorized', async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({
            where: {
                userId: req.body.userId,
                category: {
                    [Sequelize.Op.ne]: null
                }
            },
           
        })

        res.send(transactions)
    } catch(err) {
        next(err)
    }
})

router.post('/uncategorized', async (req, res, next) => {
    const page = 0
    try {
        const transactions = await Transaction.findAll({
            where: {
                userId: req.body.userId,
                category: null
            },
            limit: 10,
            offset: page * PER_PAGE,
            order: [['date', 'DESC']]
        })

        res.send(transactions)
    } catch(err) {
        next(err)
    }
})

router.post('/update-category', async (req, res, next) => {
    try {
        const transaction = await Transaction.findOne({
            where: {
                id: req.body.transactionId
            }
        })

        await transaction.update({
            category: req.body.category
        })

        res.end()

    } catch(err) {
        next(err)
    }
})

module.exports = router
