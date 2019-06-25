import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_CATEGORIZED = 'GET_CATEGORIZED_TRANSACTIONS'
const GET_UNCATEGORIZED = 'GET_UNCATEGORIZED_TRANSACTIONS'
const ADD_CATEGORY = 'ADD_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

/**
 * INITIAL STATE
 */

const initialTransactions = {
  categorized: [],
  uncategorized: []
}

/**
 * ACTION CREATORS
 */

const getCategorized = transactions => ({type: GET_CATEGORIZED, transactions})
const getUncategorized = transactions => ({
  type: GET_UNCATEGORIZED,
  transactions
})
const categorize = (transactionId, category )=> ({type: ADD_CATEGORY, transactionId, category})
const updateCategory = (transactionId, category) => ({type: UPDATE_CATEGORY, transactionId, category})


/**
 * THUNK CREATORS
 */

export const fetchCategorized = (userId, page) => async dispatch => {
  try {
    const {data} = await axios.post(
      `/api/transactions/categorized/?page=${page}`,
      {userId}
    )
    dispatch(getCategorized(data))
  } catch (err) {
    console.log(err)
  }
}

export const fetchUncategorized = (userId, page) => async dispatch => {
  try {
    const {data} = await axios.post(
      `/api/transactions/uncategorized/?page=${page}`,
      {userId}
    )
    dispatch(getUncategorized(data))
  } catch (err) {
    console.log(err)
  }
}

export const addCategory = (transactionId) => async dispatch => {
    try {
        await axios.put('/api/transactions/update-category', {transactionId, category: 'FOOD'})
        dispatch(categorize(transactionId, 'FOOD'))
    } catch (err) {
        console.log(err)
    }
}

export const changeCategory = (transactionId) => async dispatch => {
    try {
        await axios.put('/api/transactions/update-category', {transactionId, category: 'TRANSPORTATION'})
        dispatch(updateCategory(transactionId, 'TRANSPORTATION'))
    } catch (err) {
        console.log(err)
    }
}

export default function(state = initialTransactions, action) {
  switch (action.type) {
    case GET_CATEGORIZED: {
      return {...state, categorized: action.transactions}
    }
    case GET_UNCATEGORIZED: {
      return {...state, uncategorized: action.transactions}
    }
    case ADD_CATEGORY: {
        return {...state, 
                uncategorized: state.transactions.uncategorized.filter(transaction => {
                    return transaction.id !== action.transactionId
                }),
                categorized: state.transactions.categorized.map(transaction => {
                  if (transaction.id === action.transactionId) {
                    transaction.category = action.category
                  }

                  return transaction
                })
            }
    }
    case UPDATE_CATEGORY: {
        return {...state}
    }
    default:
      return state
  }
}
