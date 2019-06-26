import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
 /**
 * INITIAL STATE
 */
const initialCategories = []

 /**
 * ACTION CREATORS
 */

 const getCategories = (categories) => ({type: GET_CATEGORIES, categories})


 /**
 * THUNK CREATORS
 */

 export const fetchCategories = (userId) => async dispatch => {
     try {
         const {data} = await axios.post('/api/categories/get-categories', {userId})
         dispatch(getCategories(data))
     } catch (err) {
         console.log(err)
     }
 }

 export default function (state = initialCategories, action) {
     switch(action.type) {
        case GET_CATEGORIES: {
            return action.categories.map(cat => {
                cat.value = cat.id
                return cat
            })
        }
        default:
            return state
     }
 }