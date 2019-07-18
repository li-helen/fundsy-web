import React from 'react'
import {Button} from 'react-toolbox/lib/button'

const TransactionsHeader = props => {
  return (
    <div>
      <h2>Expenses</h2>
      <Button
        label="Edit categories"
        onClick={() => props.history.push('/account-settings')}
      />
      <Button label="Add an expense" />
    </div>
  )
}

export default TransactionsHeader
