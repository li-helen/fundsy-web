import React from 'react'
import Checkbox from 'react-toolbox/lib/checkbox'
import {VictoryChart, VictoryLine, VictoryContainer} from 'victory'
import axios from 'axios'

export default class SpendOverTime extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  getCategoryMonthlySpend = transactions => {
    return transactions.reduce((accum, elem) => {
      const month = elem.date.split('-')[1]
      if (!accum[month]) {
        accum[month] = elem.amount
      } else {
        accum[month] += elem.amount
      }
      return accum
    }, {})
  }

  formatData = monthlyTotals => {
    return Object.keys(monthlyTotals).map(month => ({
      month: Number(month),
      total: monthlyTotals[month]
    }))
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.categories !== this.props.categories) {
      //fetch all the transaction data by category
      const transactionsByCategory = await Promise.all(
        this.props.categories.map(cat => {
          return axios.post('/api/transactions/spend-history', {
            categoryId: cat.id
          })
        })
      )

      const categoryTotals = transactionsByCategory.reduce(
        (finalState, transactions, idx) => {
          const categoryId = this.props.categories[idx].id

          //get each month's total spend in each category
          const monthlyTotals = this.getCategoryMonthlySpend(transactions.data)

          //adjust formatting for Victory
          const formattedData = this.formatData(monthlyTotals)

          finalState[categoryId] = {
            selected: true,
            totalsByMonth: formattedData
          }

          return finalState
        },
        {}
      )
      this.setState({data: categoryTotals})
    }
  }

  handleChange = categoryId => {
    this.setState(state => ({
      data: {
        ...state.data,
        [categoryId]: {
          ...state.data[categoryId],
          selected: !state.data[categoryId].selected
        }
      }
    }))
  }

  render() {
    const {data} = this.state
    return (
      <div>
        {Object.keys(data).length &&
          this.props.categories.map(category => (
            <Checkbox
              key={category.id}
              checked={data[category.id].selected}
              label={category.label}
              onChange={() => this.handleChange(category.id)}
            />
          ))}

        <VictoryChart
          containerComponent={<VictoryContainer responsive={false} />}
        >
          {Object.keys(data).map(categoryId => {
            if (data[categoryId].selected) {
              return (
                <VictoryLine
                  key={categoryId}
                  data={data[categoryId].totalsByMonth}
                  x="month"
                  y="total"
                />
              )
            }
          })}
        </VictoryChart>
      </div>
    )
  }
}
