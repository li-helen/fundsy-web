import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TransactionsHeader, Transactions} from '../components'

class CategorizedTransactions extends Component {
    render() {
       return (
        <div>
            <TransactionsHeader />
            <Transactions transactions={this.props.categorizedTransactions}/>
        </div>
       )
    }
}

const mapState = state => {
    return {
        userId: state.user.id,
        categorizedTransactions: state.transactions.categorized
    }
}

export default connect(mapState)(CategorizedTransactions)