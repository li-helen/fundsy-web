import React from 'react'
import {connect} from 'react-redux'
import {TransactionsHeader, Transactions, SpendOverTime} from '../components'

/**
 * COMPONENT
 */

class Expenses extends React.Component {
  render() {
    console.log('EXPENSES RENDERING! with props: ', this.props)
    return (
      <div>
        {this.props.categories.length ? (
          <div>
            <SpendOverTime
              userId={this.props.userId}
              categories={this.props.categories}
            />
            <TransactionsHeader />
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
