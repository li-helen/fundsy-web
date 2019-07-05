const router = require('express').Router()
const {Transaction} = require('../db/models')
const Sequelize = require('sequelize')
const moment = require('moment')

const PER_PAGE = 10

router.post('/', async (req, res, next) => {
  const page = req.query.page

  try {
    let transactions
    if (req.body.categorized) {
      transactions = await Transaction.findAll({
        where: {
          userId: req.body.userId,
          categoryId: {
            [Sequelize.Op.ne]: null
          }
        },
        limit: 10,
        offset: page * PER_PAGE,
        order: [['date', 'DESC']]
      })
    } else {
      transactions = await Transaction.findAll({
        where: {
          userId: req.body.userId,
          categoryId: null
        },
        limit: 10,
        offset: page * PER_PAGE,
        order: [['date', 'DESC']]
      })
    }

    res.send(transactions)
  } catch (err) {
    next(err)
  }
})

// router.post('/spend-history', async (req, res, next) => {
//   try {
//     const categories = req.body.categories
//     const allTransactions = await Promise.all(
//       categories.map(cat =>
//         Transaction.findAll({
//           where: {
//             categoryId: cat.id,
//             date: {
//               [Sequelize.Op.gte]: moment('01-01-2019', 'MM-DD-YYYY')
//             }
//           }
//         })
//       )
//     )
//     res.send(
//       allTransactions.reduce((accum, transactionsByCat, idx) => {
//         accum[categories[idx].id] = transactionsByCat
//         return accum
//       }, {})
//     )
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/spend-history', async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll({
      where: {
        categoryId: req.body.categoryId,
        date: {
          [Sequelize.Op.gte]: moment().subtract(6, 'months')
        }
      }
    })
    res.send(allTransactions)
  } catch (err) {
    next(err)
  }
})

router.put('/update-category', async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      where: {
        id: req.body.transactionId
      }
    })

    await transaction.update({
      categoryId: req.body.categoryId
    })

    res.end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
