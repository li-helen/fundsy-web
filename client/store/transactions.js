import axios from 'axios'

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
        const {data} = await axios.post('/api/plaid/transactions/get', {userId})
        dispatch(getTransactions(data))
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