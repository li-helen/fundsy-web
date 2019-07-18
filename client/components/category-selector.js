import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import _ from 'lodash'
import Dropdown from 'react-toolbox/lib/dropdown'
import {Button} from 'react-toolbox/lib/button'

class CategorySelector extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedCategory: '',
      dropdownKey: _.uniqueId()
      // categories: []
    }
  }

  // async componentDidMount() {
  //   const {data} = await axios.get(`/api/categories/${this.props.userId}`)
  //   this.setState({categories: data})
  // }

  handleChange = value => {
    this.setState({selectedCategory: value})
    this.setState({dropdownKey: _.uniqueId()})
  }

  render() {
    const {transactionId, categories, categoryId} = this.props
    const {selectedCategory} = this.state
    return (
      <div>
        <div style={selectorStyle}>
          <Dropdown
            key={this.state.dropdownKey}
            label={
              categoryId !== null
                ? categories.filter(cat => cat.id === categoryId)[0].label
                : 'Assign a category'
            }
            auto={false}
            source={categories}
            onChange={this.handleChange}
            value={selectedCategory}
          />
          <Button
            onClick={() =>
              this.props.setCategory(transactionId, selectedCategory)
            }
          >
            Set category
          </Button>
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

export default connect(mapState)(CategorySelector)

const selectorStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
}
