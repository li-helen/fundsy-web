import React from 'react'
// import {connect} from 'react-redux'
import Checkbox from 'react-toolbox/lib/checkbox'
import {VictoryContainer, VictoryChart, VictoryLine, VictoryAxis} from 'victory'
import axios from 'axios'
import moment from 'moment'

export default class SpendOverTime extends React.Component {
  constructor() {
    super()
    this.state = {
      userCategories: [],
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

  async componentDidMount() {
    //get the user's categories
    const {data} = await axios.post('/api/categories/get-categories', {
      userId: this.props.userId
    })
    this.setState({userCategories: data})
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      !Object.keys(prevState.data).length &&
      !prevState.userCategories.length
    ) {
      //fetch all the transaction data by category
      const transactionsByCategory = await Promise.all(
        this.state.userCategories.map(cat => {
          return axios.post('/api/transactions/spend-history', {
            categoryId: cat.id
          })
        })
      )
      const categoryTotals = transactionsByCategory.reduce(
        (finalState, transactions, idx) => {
          const categoryId = this.state.userCategories[idx].id

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
    const monthlyTickCount = Object.keys(data).length
      ? Math.max(
          ...Object.keys(data).map(catId => data[catId].totalsByMonth.length)
        )
      : 0
    return (
      <div>
        {Object.keys(data).length && (
          <div>
            {this.state.userCategories.map(category => (
              <Checkbox
                key={category.id}
                checked={data[category.id].selected}
                label={category.label}
                onChange={() => this.handleChange(category.id)}
              />
            ))}
            <VictoryChart
              containerComponent={<VictoryContainer responsive={false} />}
              style={{
                parent: {
                  border: '5px solid #ccc',
                  marginLeft: '50px'
                },
                data: {
                  fill: '#c43a31',
                  fillOpacity: 0.6,
                  stroke: '#c43a31',
                  strokeWidth: 3
                },
                labels: {
                  fontSize: 80,
                  fill: '#c43a31',
                  padding: 5
                }
              }}
            >
              <VictoryAxis
                label="Month"
                tickCount={monthlyTickCount}
                offsetX={50}
                tickFormat={t =>
                  moment()
                    .month(Math.floor(t))
                    .format('MMM')
                }
                style={{tickLabels: {fontSize: 10, padding: 10}}}
              />
              <VictoryAxis
                dependentAxis
                offsetX={50}
                tickFormat={t => `$${t}`}
                style={{tickLabels: {fontSize: 10, padding: 10}}}
              />
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
        )}
      </div>
    )
  }
}

// const mapState = state => {
//     return {
//         userId: state.user.id
//     }
// }

// export default connect(mapState)(SpendOverTime)
