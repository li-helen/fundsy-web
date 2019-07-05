import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CategorySelector} from '../components'
import {FontIcon} from 'react-toolbox/lib/font_icon'
import {Table, TableHead, TableRow, TableCell} from 'react-toolbox/lib/table'
import axios from 'axios'

// //for most up-to-date docs on tables:
// //https://github.com/react-toolbox/react-toolbox/tree/dev/components/table#data-table

class Transactions extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      page: 0
    }
  }

  getPage = async page => {
    if (page >= 0) {
      const {data} = await axios.post(`/api/transactions/?page=${page}`, {
        userId: this.props.userId,
        categorized: this.props.categorized
      })

      this.setState({
        transactions: data,
        page
      })
    }
  }

  componentDidMount() {
    this.getPage(this.state.page)
  }

  setCategory = async (transactionId, categoryId) => {
    await axios.put('/api/transactions/update-category', {
      transactionId,
      categoryId
    })

    this.getPage(this.state.page)
  }

  render() {
    return (
      <div>
        <Table style={{margin: 50}} selectable={false}>
          <TableHead>
            <TableCell>Date</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
          </TableHead>

          {this.state.transactions.length &&
            this.state.transactions.map(transaction => {
              return (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div>{transaction.date}</div>
                  </TableCell>
                  <TableCell>
                    <div>{transaction.account}</div>
                  </TableCell>
                  <TableCell>
                    <div>{transaction.description}</div>
                  </TableCell>
                  <TableCell>
                    <div>{transaction.amount}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {
                        <CategorySelector
                          transactionId={transaction.id}
                          categoryId={transaction.categoryId}
                          setCategory={this.setCategory}
                        />
                      }
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
        </Table>

        <FontIcon onClick={() => this.getPage(this.state.page - 1)}>
          arrow_back
        </FontIcon>
        <FontIcon onClick={() => this.getPage(this.state.page + 1)}>
          arrow_forward
        </FontIcon>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState)(Transactions)
