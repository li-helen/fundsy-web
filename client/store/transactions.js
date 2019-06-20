import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

 const GET_CATEGORIZED = 'GET_CATEGORIZED_TRANSACTIONS'
 const GET_UNCATEGORIZED = 'GET_UNCATEGORIZED_TRANSACTIONS'

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

 const getCategorized = (transactions) => ({type: GET_CATEGORIZED, transactions})
 const getUncategorized = (transactions) => ({type: GET_UNCATEGORIZED, transactions})

 /**
 * THUNK CREATORS
 */

//  export const fetchTransactions = (userId) => async dispatch => {
//     try {
//         // await axios.post('/api/plaid/transactions/get', {userId})
//         const { data } = await axios.post('/api/transactions', {userId})
//         dispatch(getTransactions(data))
//         history.push('/expenses')
//     } catch(err) {
//         console.log(err)
//     }
//  }

 export const fetchCategorized = (userId) => async dispatch => {
     try {
         const { data } = await axios.post('/api/transactions/categorized', {userId})
         dispatch(getCategorized(data))

     } catch(err) {
         console.log(err)
     }
 }

 export const fetchUncategorized = (userId, page) => async dispatch => {
    try {
        const { data } = await axios.post(`/api/transactions/uncategorized/?page=${page}`, {userId})
        dispatch(getUncategorized(data))

    } catch(err) {
        console.log(err)
    }
}

 export default function (state = initialTransactions, action) {
     switch(action.type) {
         case GET_CATEGORIZED: {
             return ({...state, categorized: action.transactions})
         }
         case GET_UNCATEGORIZED: {
            return ({...state, uncategorized: action.transactions})
         }
         default:
             return state
     }
 }