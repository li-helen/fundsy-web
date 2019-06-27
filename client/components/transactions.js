import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CategorySelector } from '../components'
import {fetchTransactions} from '../store'
import {FontIcon} from 'react-toolbox/lib/font_icon';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
// import { Button } from 'react-toolbox/lib/button'

// //for most up-to-date docs on tables:
// //https://github.com/react-toolbox/react-toolbox/tree/dev/components/table#data-table

class Transactions extends Component {
    constructor() {
        super()
        this.state = {
            page: 0
        }
    }
      nextPage = () => {
        this.props.fetchTransactions(this.props.userId, this.state.page + 1)
        this.setState((state) => {
          return {page: state.page + 1}
        })
      }
    
      lastPage = () => {
        if (this.state.page > 0) {
          this.props.fetchTransactions(this.props.userId, this.state.page - 1)
          this.setState((state) => {
            return {page: state.page - 1}
          })
        }
      }

      render() {
        const {transactions, userId, categorized} = this.props
        return ( 
          <div>
            <Table style={{ margin: 50 }} selectable={false}>
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
                      <TableCell><div>{<CategorySelector 
                                        transactionId={transaction.id}
                                        categoryId={transaction.categoryId}
                                        categorized={categorized}
                                        userId={userId}
                                        page={this.state.page}
                                        />}</div></TableCell>
                  </TableRow>
              })}
            </Table>
    
            <FontIcon onClick={this.lastPage}>arrow_back</FontIcon>
            <FontIcon onClick={this.nextPage}>arrow_forward</FontIcon>
            
          </div>
          
        );
      }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTransactions: (userId, page) => dispatch(fetchTransactions(userId, page))
  }
}

export default connect(mapState, mapDispatch)(Transactions)