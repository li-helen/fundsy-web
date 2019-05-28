import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import CategorySelector from './category-selector'
import { fetchTransactions } from '../store'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';

// //for most up-to-date docs on tables:
// //https://github.com/react-toolbox/react-toolbox/tree/dev/components/table#data-table

class Transactions extends Component {

  componentDidMount() {
    this.props.getTransactions(this.props.userId)
  }

  render () {
    return (
      <Table style={{ marginTop: 10 }} selectable={false}>
          <TableHead>
            <TableCell>Date</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
          </TableHead>

        {this.props.transactions.length && this.props.transactions.map(transaction => {
            return <TableRow key={transaction.id}>
                <TableCell><div>{transaction.date}</div></TableCell>
                <TableCell><div>{transaction.account}</div></TableCell>
                <TableCell><div>{transaction.description}</div></TableCell>
                <TableCell><div>{transaction.amount}</div></TableCell>
                <TableCell><div>{<CategorySelector />}</div></TableCell>
            </TableRow>
        })}
      </Table>
    );
  }
}


const mapState = state => {
    return {
      userId: state.user.id,
      transactions: state.transactions
    }
}

const mapDispatch = dispatch => {
  return {
      getTransactions: (userId) => dispatch(fetchTransactions(userId))
  }
}

export default connect(mapState, mapDispatch)(Transactions)

