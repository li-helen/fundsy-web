import React from 'react'
import PlaidLink from 'react-plaid-link'

export class LinkAccount extends React.Component {
    handleOnSuccess = (token, metadata) => {
        console.log('TOKEN FROM ONSUCCESSHANDLER: ', token)
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
