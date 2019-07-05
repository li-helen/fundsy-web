import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const GET_HISTORY = 'GET_HISTORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
/**
 * INITIAL STATE
 */

const initialTransactions = {
  transactionsInView: [],
  transactionHistory: []
}

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => ({type: GET_TRANSACTIONS, transactions})
const getHistory = (transactions) => ({type: GET_HISTORY, transactions})
const updateCategory = (transactionId, categoryId) => ({type: UPDATE_CATEGORY, transactionId, categoryId})

/**
 * THUNK CREATORS
 */

 export const fetchTransactions = (userId, page) => async dispatch => {
   try {
     const { data } = await axios.post(`/api/transactions/?page=${page}`, {userId})
     dispatch(getTransactions(data))
   } catch (err) {
     console.log(err)
   }
 }

export const fetchHistory = (userId, categories) => async dispatch => {
  try {
    const { data } = await axios.post('/api/transactions/spend-history', {userId, categories})
    dispatch(getHistory(data))
  } catch (err) {
    console.log(err)
  }
}

export const setCategory = (transactionId, categoryId, categorized, userId, page) => async dispatch => {
    try {
      await axios.put('/api/transactions/update-category', {transactionId, categoryId})
      if(categorized) {
        //We want to update the category of an already categorized expense (in the Expenses component)
        dispatch(updateCategory(transactionId, categoryId))
      } else {
        //We're categorizing this expense for the first time (in the UserHome component)
        dispatch(fetchTransactions(userId, page))
      }
    } catch (err) {
        console.log(err)
    }
}

export default function(state = initialTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS: {
      return action.transactions
    }
    case GET_HISTORY: {
      return 
    }
    case UPDATE_CATEGORY: {
      return state.map(transaction => {
        if (transaction.id === action.transactionId) transaction.categoryId = action.categoryId
        return transaction
      })
    }
    default:
      return state
  }
}
