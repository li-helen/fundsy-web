import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transactions } from '../components'
import { fetchUncategorized } from '../store'

class UncategorizedTransactions extends Component {
  render () {
    return ( 
      <div>
        <Transactions
          userId={this.props.userId}
          transactions={this.props.uncategorizedTransactions}
          fetchTransactions={this.props.fetchUncategorized}
        />
      </div>
      
    );
  }
}


const mapState = state => {
    return {
      userId: state.user.id,
      uncategorizedTransactions: state.transactions.uncategorized
    }
}

const mapDispatch = dispatch => {
  return {
    fetchUncategorized: (userId, page) => dispatch(fetchUncategorized(userId, page))
  }
}

export default connect(mapState, mapDispatch)(UncategorizedTransactions)

