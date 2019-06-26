const router = require('express').Router()
const {Transaction} = require('../db/models')
const Sequelize = require('sequelize')

const PER_PAGE = 10

router.post('/', async (req, res, next) => {
  const page = req.query.page
  try {
    const transactions = await Promise.all([
      Transaction.findAll({
        where: {
          userId: req.body.userId,
          categoryId: {
            [Sequelize.Op.ne]: null
          }
        },
        limit: 10,
        offset: page * PER_PAGE,
        order: [['date', 'DESC']]
      }),

      Transaction.findAll({
        where: {
          userId: req.body.userId,
          categoryId: null
        },
        limit: 10,
        offset: page * PER_PAGE,
        order: [['date', 'DESC']]
      })
    ]).then(([categorized, uncategorized]) => {
        res.send(categorized.concat(uncategorized))
    })

    res.send(transactions)
  } catch (err) {
    next(err)
  }
})

router.put('/update-category', async (req, res, next) => {
  console.log('transactionId', req.body.transactionId)
  console.log('CATEGORYID: ', req.body.categoryId)
  try {
    const transaction = await Transaction.findOne({
      where: {
        id: req.body.transactionId
      }
    })

    await transaction.update({
      categoryId: req.body.categoryId
    })
    console.log('transaction is now: ', transaction)

    res.end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
