import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {setCategory} from '../store'
import Dropdown from 'react-toolbox/lib/dropdown'
import {Button} from 'react-toolbox/lib/button'

class CategorySelector extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedCategory: '',
      dropdownKey: _.uniqueId()
    }
  }

  handleChange = value => {
    this.setState({selectedCategory: value})
    this.setState({dropdownKey: _.uniqueId()})
  }

  render() {
    console.log('this.props.categoryId: ', this.props.categoryId)
    const {transactionId, categorized, userId, page} = this.props
    const {selectedCategory} = this.state
    return (
      <div>
        <Dropdown
          key={this.state.dropdownKey}
          label={
            this.props.categoryId !== null
              ? this.props.categories.filter(
                  cat => cat.id === this.props.categoryId
                )[0].label
              : 'Assign a category'
          }
          auto={false}
          source={this.props.categories}
          onChange={this.handleChange}
          value={this.state.selectedCategory}
        />
        <Button
          onClick={() =>
            this.props.setCategory(
              transactionId,
              selectedCategory,
              categorized,
              userId,
              page
            )
          }
        >
          Set category
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    setCategory: (transactionId, categoryId, categorized, userId, page) =>
      dispatch(
        setCategory(transactionId, categoryId, categorized, userId, page)
      )
  }
}

export default connect(mapState, mapDispatch)(CategorySelector)
