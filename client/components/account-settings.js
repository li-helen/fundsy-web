import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-toolbox/lib/button'
import {LinkAccount, CategoriesForm} from '../components'
import {addNewCategory, updateCategory, deleteCategory} from '../store'

class SetCategories extends React.Component {
  constructor() {
    super()
    this.state = {
      userCategories: [],
      addingNewCategory: false
    }
  }

  componentDidMount() {
    this.setState({userCategories: this.props.categories})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categories !== this.props.categories) {
      this.setState({userCategories: this.props.categories})
    }
  }

  componentWillUnmount() {
    this.state.userCategories.forEach(cat => {
      cat.editing = false
    })
  }

  editLabel = id => {
    this.setState(state => ({
      userCategories: state.userCategories.map(cat => {
        if (id === cat.id) cat.editing = true
        return cat
      })
    }))
  }

  setLabel = (id, label) => {
    if (id) {
      //we're updating an existing category
      this.props.updateCategory(id, label)
    } else {
      //we're creating a new category
      this.props.addCategory(this.props.userId, label)
    }

    this.setState({addingNewCategory: false})
  }

  deleteLabel = categoryId => {
    this.props.deleteCategory(categoryId)
  }

  handleChange = id => {
    this.setState(state => ({
      userCategories: state.userCategories.map(cat => {
        if (id === cat.id) cat.label = event.target.value
        return cat
      })
    }))
  }

  startNewCategory = () => {
    //only allow users to add one category at a time
    if (!this.state.addingNewCategory && this.state.userCategories.length < 5) {
      const newCategory = {id: null, label: '', editing: true}
      this.setState(state => ({
        userCategories: [...state.userCategories, newCategory],
        addingNewCategory: true
      }))
    }
  }

  render() {
    return (
      <div>
        <h3>My Accounts</h3>
        <LinkAccount />
        <div id="accountSettingsCategories">
          <h3>My Budget</h3>
          <div id="addCategoryContainer">
            <h5>Add up to 5 categories.</h5>
            <Button onClick={this.startNewCategory}>Add a category</Button>
          </div>
          {this.state.userCategories.length ? (
            <CategoriesForm
              userCategories={this.state.userCategories}
              handleChange={this.handleChange}
              setLabel={this.setLabel}
              editLabel={this.editLabel}
              deleteLabel={this.deleteLabel}
            />
          ) : (
            <div>No categories added yet!</div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    addCategory: (userId, label) => dispatch(addNewCategory(userId, label)),
    updateCategory: (id, label) => dispatch(updateCategory(id, label)),
    deleteCategory: categoryId => dispatch(deleteCategory(categoryId))
  }
}

export default connect(mapState, mapDispatch)(SetCategories)
