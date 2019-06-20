import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CategorySelector } from '../components'
import {FontIcon} from 'react-toolbox/lib/font_icon';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import { Button } from 'react-toolbox/lib/button'
import { fetchUncategorized } from '../store'

// //for most up-to-date docs on tables:
// //https://github.com/react-toolbox/react-toolbox/tree/dev/components/table#data-table

class Transactions extends Component {
  constructor() {
    super()

    this.state = {
      page: 0
    }
  }

  setCategory() {
    console.log('SETTING CATEGORY')
  }

  nextPage = async () => {
    console.log('NEXT PAGE CLICKED')
    await this.setState((state) => {
      return {page: state.page + 1}
    })
    console.log('PAGE IS NOW: ', this.state.page)
    this.props.fetchUncategorized(this.props.userId, this.state.page)
  }

  lastPage = () => {
    console.log('PREV PAGE')
    this.setState((state) => {
      if (state.pages === 0) return state
      else return ({page: state.page - 1})
    })
    this.props.fetchUncategorized(this.props.userId, this.state.page)
  }

  render () {
    const {transactions} = this.props
    console.log('STATE IS: ', this.state)
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
                  <TableCell><div>{<CategorySelector />}</div></TableCell>
                  <TableCell><div><Button onClick={(transactionId) => this.setCategory(transactionId)}>Set category</Button></div></TableCell>
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
      userId: state.user.id,
      transactions: state.transactions.uncategorized
    }
}

const mapDispatch = dispatch => {
  return {
    fetchUncategorized: (userId, page) => dispatch(fetchUncategorized(userId, page))
  }
}

export default connect(mapState, mapDispatch)(Transactions)

