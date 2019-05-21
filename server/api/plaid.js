const router = require('express').Router()
const plaid = require('plaid')
const {PLAID_CLIENT_ID, PLAID_SECRET} = require('../../secrets')

//initializing Plaid client
const PLAID_PUBLIC_KEY = '5242cceff2322ca8098710f72d6825'
// const PLAID_ENV = 'sandbox'

const client = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments.sandbox,
    {version: '2018-05-22'}
)

router.post('/get_access_token', (req, res, next) => {
    client.exchangePublicToken(req.body.publicToken, function(err, tokenResponse) {
        if (err) {
            next(err)
        } else {
            console.log('TOKEN RESPONSE IN EXPRESS ROUTE: ', tokenResponse)
            res.send({
                accessToken: tokenResponse.access_token,
                itemId: tokenResponse.item_id
            })
        }
    })
})

module.exports = router