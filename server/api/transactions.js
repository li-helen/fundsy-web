const router = require('express').Router()
const {Transaction} = require('../db/models')

router.post('/', async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({
            where: {
                userId: req.body.userId
            }
        })

        res.send(transactions)
    } catch(err) {
        next(err)
    }
})

module.exports = router
