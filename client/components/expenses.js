import React from 'react'
import {connect} from 'react-redux'
import {TransactionsHeader, Transactions} from '../components'


/**
 * COMPONENT
 */

class Expenses extends React.Component {
  render() {
    return (
      <div>
        <TransactionsHeader />
        <Transactions transactions={this.props.transactions} categorized={true} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    transactions: state.transactions.filter(transaction => transaction.categoryId !== null)
  }
}


export default connect(mapState)(Expenses)