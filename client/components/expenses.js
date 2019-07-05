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
        <SpendOverTime
          categories={this.props.categories}
        />
        <TransactionsHeader />
        <Transactions categorized={true} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    categories: state.categories
  }
}

export default connect(mapState)(Expenses)
