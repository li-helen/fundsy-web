import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TransactionsHeader, Transactions} from '../components'
import { fetchCategorized } from '../store'

class CategorizedTransactions extends Component {
    render() {
       return (
        <div>
            <TransactionsHeader />
            <Transactions
                userId={this.props.userId}
                transactions={this.props.categorizedTransactions}
                fetchTransactions={this.props.fetchCategorized}
                />
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

const mapDispatch = dispatch => {
    return {
        fetchCategorized: (userId, page) => dispatch(fetchCategorized(userId, page))
    }
}

export default connect(mapState, mapDispatch)(CategorizedTransactions)