const router = require('express').Router()
const plaid = require('plaid')
const {PLAID_CLIENT_ID, PLAID_SECRET} = require('../../secrets')
const {Account, User, Transaction} = require('../db/models')

//initializing Plaid client
const PLAID_PUBLIC_KEY = '5242cceff2322ca8098710f72d6825'
const PLAID_ENV = plaid.environments.sandbox

const client = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    PLAID_ENV,
    {version: '2018-05-22'}
)

router.post('/get_access_token', (req, res, next) => {
    client.exchangePublicToken(req.body.publicToken, async function(err, tokenResponse) {
        if (!err) {
            const newAcct = await Account.create({
                accessToken: tokenResponse.access_token,
                lastUpate: Date.now()
            })

            const user = await User.findOne({
                where: {
                    id: req.body.userId
                }
            })

            user.addAccount(newAcct)
            res.end()
        } else {
            next(err)
        }
    })
})

router.post('/transactions/get', async (req, res, next) => {
    const today = new Date()
    const month = (today.getMonth() + 1 < 10) ? (`0${today.getMonth() + 1}`) : (today.getMonth() + 1)
    const day = (today.getDate() < 10) ? `0${today.getDate()}` : today.getDate()
    const year = today.getFullYear()

    const user = await User.findOne({
        where: {
            id: req.body.userId
        }
    })
    //need to later think about how to access the correct access token for users
    //who may have more than one account
    const account = await Account.findOne({
        where: {
            userId: req.body.userId
        }
    })
    console.log('account info in transactions/get!', account)
    client.getTransactions(account.accessToken, '2018-01-01', `${year}-${month}-${day}`, {
        // count: 8,
        // offset: 0
    }, (err, result) => {
        if(err) {
            console.log('ERROR WHILE FETCHING TRANSACTIONS!', err)
        } else {
            let transactions = result.transactions.map(async (transaction) => {
                const newTransaction = await Transaction.create({
                    date: transaction.date,
                    description: transaction.name,
                    amount: transaction.amount,
                })

                user.addTransaction(newTransaction)
                newTransaction.setAccount(account)
                return newTransaction
                
            })
            res.send(transactions)
        }
    })
})

module.exports = router