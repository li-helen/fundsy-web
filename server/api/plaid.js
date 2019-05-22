const router = require('express').Router()
const plaid = require('plaid')
const {PLAID_CLIENT_ID, PLAID_SECRET} = require('../../secrets')

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
    client.exchangePublicToken(req.body.publicToken, function(err, tokenResponse) {
        if (!err) {
            res.send({
                accessToken: tokenResponse.access_token,
                itemId: tokenResponse.item_id
            })
        } else {
            next(err)
        }
    })
})

router.post('/transactions/get', (req, res, next) => {
    
})

module.exports = router