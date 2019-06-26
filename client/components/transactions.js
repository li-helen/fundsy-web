import React, { Component } from 'react';
import { CategorySelector } from '.'
import {FontIcon} from 'react-toolbox/lib/font_icon';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import { Button } from 'react-toolbox/lib/button'

// //for most up-to-date docs on tables:
// //https://github.com/react-toolbox/react-toolbox/tree/dev/components/table#data-table

export default class Transactions extends Component {
    constructor() {
        super()

        this.state = {
            page: 0
        }
    }

    setCategory(transactionId) {
        console.log('SETTING CATEGORY')
        console.log('transactionId is: ', transactionId)
      }
    
      nextPage = async () => {
        console.log('NEXT PAGE CLICKED')
        await this.setState((state) => {
          return {page: state.page + 1}
        })
        console.log('PAGE IS NOW: ', this.state.page)
        this.props.fetchTransactions(this.props.userId, this.state.page)
      }
    
      lastPage = () => {
        console.log('PREV PAGE')
        this.setState((state) => {
          if (state.pages === 0) return state
          else return ({page: state.page - 1})
        })
        this.props.fetchTransactions(this.props.userId, this.state.page)
      }

      render() {
        const {transactions} = this.props
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
                      <TableCell><div><Button onClick={() => this.setCategory(transaction.id)}>Set category</Button></div></TableCell>
                  </TableRow>
              })}
            </Table>
    
            <FontIcon onClick={this.lastPage}>arrow_back</FontIcon>
            <FontIcon onClick={this.nextPage}>arrow_forward</FontIcon>
            
          </div>
          
        );
      }
}