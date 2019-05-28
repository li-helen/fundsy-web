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

 const getTransactions = (transactions) => ({type: GET_TRANSACTIONS, transactions})

 /**
 * THUNK CREATORS
 */

 export const fetchTransactions = (userId) => async dispatch => {
    try {
        // await axios.post('/api/plaid/transactions/get', {userId})
        const { data } = await axios.post('/api/transactions', {userId})
        dispatch(getTransactions(data))
        history.push('/transactions')
    } catch(err) {
        console.log(err)
    }
 }

 export default function (state = initialTransactions, action) {
     switch(action.type) {
         case GET_TRANSACTIONS: {
             return action.transactions
         }
         default:
             return state
     }
 }