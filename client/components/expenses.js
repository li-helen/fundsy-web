import React from 'react'
import {connect} from 'react-redux'
import {TransactionsHeader, Transactions, SpendOverTime} from '../components'

/**
 * COMPONENT
 */

class Expenses extends React.Component {
  render() {
    return (
      <div className="containerDiv">
        {this.props.categories.length ? (
          <div>
            <SpendOverTime
              userId={this.props.userId}
              categories={this.props.categories}
            />
            <TransactionsHeader history={this.props.history} />
            <Transactions categorized={true} view="expenses" />
          </div>
        ) : (
          <div>
            Start by categorizing your expenses to see your spending over time.
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    categories: state.categories
  }
}

export default connect(mapState)(Expenses)
