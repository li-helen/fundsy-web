import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CategorySelector } from '../components'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import { Button } from 'react-toolbox/lib/button'

// //for most up-to-date docs on tables:
// //https://github.com/react-toolbox/react-toolbox/tree/dev/components/table#data-table

class Transactions extends Component {

  setCategory() {
    console.log('SETTING CATEGORY')
  }

  render () {
    const {transactions} = this.props
    return (
      <div>
        <Table style={{ marginTop: 10 }} selectable={false}>
          <TableHead>
            <TableCell>Date</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
          </TableHead>

          {transactions.length && transactions.map(transaction => {
              return <TableRow key={transaction.id}>
                  <TableCell><div>{transaction.date}</div></TableCell>
                  <TableCell><div>{transaction.account}</div></TableCell>
                  <TableCell><div>{transaction.description}</div></TableCell>
                  <TableCell><div>{transaction.amount}</div></TableCell>
                  <TableCell><div>{<CategorySelector />}</div></TableCell>
                  <TableCell><div><Button onClick={(transactionId) => this.setCategory(transactionId)}>Set category</Button></div></TableCell>
              </TableRow>
          })}
        </Table>
      </div>
      
    );
  }
}


const mapState = state => {
    return {
      userId: state.user.id
    }
}

export default connect(mapState)(Transactions)
