import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
const EDIT_CATEGORY = 'EDIT_CATEGORY'

/**
 * INITIAL STATE
 */
const initialCategories = []

/**
 * ACTION CREATORS
 */

const getCategories = categories => ({type: GET_CATEGORIES, categories})
const addCategory = category => ({type: ADD_CATEGORY, category})
const editCategory = category => ({type: EDIT_CATEGORY, category})

/**
 * THUNK CREATORS
 */

export const addNewCategory = (userId, label) => async dispatch => {
  try {
    const {data} = await axios.post('/api/categories', {userId, label})
    dispatch(addCategory(data))
  } catch (err) {
    console.log(err)
  }
}

export const fetchCategories = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/categories/${userId}`)
    dispatch(getCategories(data))
  } catch (err) {
    console.log(err)
  }
}

export const updateCategory = (id, label) => async dispatch => {
  try {
    const {data} = await axios.put('/api/categories', {id, label})
    dispatch(editCategory(data))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = initialCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES: {
      return action.categories.map(cat => {
        cat.value = cat.id
        cat.editing = false
        return cat
      })
    }
    case ADD_CATEGORY: {
      action.category.value = action.category.id
      action.category.editing = false
      return [...state, action.category]
    }
    case EDIT_CATEGORY: {
      return state.map(cat => {
        if (cat.id === action.category.id) {
          cat.label = action.category.label
          cat.editing = false
        }
        return cat
      })
    }
    default:
      return state
  }
}
