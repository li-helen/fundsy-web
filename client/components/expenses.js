import React from 'react'
import {connect} from 'react-redux'
import {TransactionsHeader, Transactions, SpendOverTime} from '../components'

/**
 * COMPONENT
 */

class Expenses extends React.Component {
  render() {
    return (
      <div>
        <SpendOverTime userId={this.props.userId}/>
        <TransactionsHeader />
        <Transactions categorized={true} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState)(Expenses)
