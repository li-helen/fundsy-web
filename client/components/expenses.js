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
          transactions={[{x: 2, y: 6}, {x: 6, y: 10}]}
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
