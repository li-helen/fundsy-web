import React from 'react'
import axios from 'axios'
import PlaidLink from 'react-plaid-link'
import { connect } from 'react-redux';
import { fetchTransactions } from '../store'

class LinkAccount extends React.Component {
    handleOnSuccess =  async (token, metadata) => {
        await axios.post('/api/plaid/get_access_token', {publicToken: token, userId: this.props.userId})
        await axios.post('/api/plaid/transactions/get', {userId: this.props.userId})
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

const mapState = state => {
    return {
        userId: state.user.id
    }
}


export default connect(mapState)(LinkAccount)
