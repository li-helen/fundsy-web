import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/**
 * INITIAL STATE
 */

const initialTransactions = []

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => ({type: GET_TRANSACTIONS, transactions})
const categorize = (transactionId, category )=> ({type: ADD_CATEGORY, transactionId, category})
const updateCategory = (transactionId, category) => ({type: UPDATE_CATEGORY, transactionId, category})

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

// export const addCategory = (transactionId) => async dispatch => {
//     try {
//         await axios.put('/api/transactions/update-category', {transactionId, category: 'FOOD'})
//         dispatch(categorize(transactionId, 'FOOD'))
//     } catch (err) {
//         console.log(err)
//     }
// }

// export const changeCategory = (transactionId) => async dispatch => {
//     try {
//         await axios.put('/api/transactions/update-category', {transactionId, category: 'TRANSPORTATION'})
//         dispatch(updateCategory(transactionId, 'TRANSPORTATION'))
//     } catch (err) {
//         console.log(err)
//     }
// }

export default function(state = initialTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS: {
      return action.transactions
    }
    default:
      return state
  }
}
