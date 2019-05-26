import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import CategorySelector from './category-selector'
import { connect } from 'react-redux';


// //for most up-to-date docs on tables:
// //https://github.com/react-toolbox/react-toolbox/tree/dev/components/table#data-table

class Transactions extends Component {

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

        {this.props.transactions.map(transaction => {
            return <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.account}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{<CategorySelector />}</TableCell>
            </TableRow>
        })}
      </Table>
    );
  }
}


const mapState = state => {
    return {
        transactions: state.transactions
    }
}

export default connect(mapState)(Transactions)

