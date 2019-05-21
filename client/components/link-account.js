import React from 'react'
import axios from 'axios'
import PlaidLink from 'react-plaid-link'

export class LinkAccount extends React.Component {
    handleOnSuccess =  async (token, metadata) => {
        console.log('TOKEN FROM ONSUCCESSHANDLER: ', token)
        const data = await axios.post('/api/plaid/get_access_token', {publicToken: token})
        console.log('RESPONSE FROM GET_ACCESS_TOKEN!', data)
    }

    handleOnExit = () => {
        console.log('EXITED PLAID LINK!!!')
    }

    render() {
        return (
            <PlaidLink 
                clientName="Fundsy"
                env="sandbox"
                product={["auth", "transactions"]}
                publicKey="5242cceff2322ca8098710f72d6825"
                onExit={this.handleOnExit}
                onSuccess={this.handleOnSuccess}>
                Open Link and connect your bank!>
            </PlaidLink>
        )
    }
}
