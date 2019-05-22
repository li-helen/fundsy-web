const router = require('express').Router()
const plaid = require('plaid')
const {PLAID_CLIENT_ID, PLAID_SECRET} = require('../../secrets')
const {Account, User} = require('../db/models')

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
    const account = await Account.findOne({
        where: {
            userId: req.body.userId
        }
    })
    console.log('account info in transactions/get!', account, 'and then account access token: ', account.accessToken)
    client.getTransactions(account.accessToken, '2019-01-01', '2019-05-01', {
        count: 10,
        offset: 0
    }, (err, result) => {
        if(err) {
            console.log('ERROR WHILE FETCHING TRANSACTIONS!', err)
        } else {
            console.log('SUCCESS! HERE ARE THE TRANSACTIONS: ', result.transactions)
        }
    })
})

module.exports = router