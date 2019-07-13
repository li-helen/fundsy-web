import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Input} from 'react-toolbox/lib/input'
import {Button} from 'react-toolbox/lib/button'
import {LinkAccount} from '../components'

class SetCategories extends React.Component {
  constructor() {
    super()
    this.state = {
      userCategories: [],
      addingNewCategory: false
    }
  }

  async componentDidMount() {
    const {data} = await axios.get(`/api/categories/${this.props.userId}`)
    const userCategories = data.reduce((accum, elem) => {
      accum.push({id: elem.id, label: elem.label, editing: false})
      return accum
    }, [])
    this.setState({userCategories})
  }

  editLabel = id => {
    this.setState(state => ({
      userCategories: state.userCategories.map(cat => {
        if (id === cat.id) cat.editing = true
        return cat
      })
    }))
  }

  setLabel = async (id, label) => {
    if (id) {
      //we're updating an existing category
      await axios.put('/api/categories', {id, label})
    } else {
      //we're creating a new category
      await axios.post('/api/categories', {userId: this.props.userId, label})
    }
    const {data} = await axios.get(`/api/categories/${this.props.userId}`)

    const userCategories = data.reduce((accum, elem) => {
      accum.push({id: elem.id, label: elem.label, editing: false})
      return accum
    }, [])
    this.setState({userCategories, addingNewCategory: false})
  }

  handleChange = id => {
    this.setState(state => ({
      userCategories: state.userCategories.map(cat => {
        if (id === cat.id) cat.label = event.target.value
        return cat
      })
    }))
  }

  addCategory = () => {
    if (!this.state.addingNewCategory && this.state.userCategories.length < 5) {
      const newCategory = {id: null, label: '', editing: true}
      this.setState(state => ({
        userCategories: [...state.userCategories, newCategory],
        addingNewCategory: true
      }))
    }
  }

  render() {
    const {userCategories} = this.state
    return (
      <div>
        <h3>My Accounts</h3>
        <LinkAccount />
        <h3>My Budget</h3>
        <h5>Add up to 5 categories.</h5>
        <Button onClick={this.addCategory}>Add a category</Button>

        {userCategories.length &&
          userCategories.map((cat, idx) => {
            return cat.editing ? (
              <div key={cat.id}>
                <Input
                  type="text"
                  value={userCategories[idx].label}
                  onChange={() => this.handleChange(cat.id)}
                />
                <Button onClick={() => this.setLabel(cat.id, cat.label)}>
                  Set Category Label
                </Button>
              </div>
            ) : (
              <div key={cat.id}>
                <h4>{cat.label}</h4>
                <Button onClick={() => this.editLabel(cat.id)}>
                  Edit Category Label
                </Button>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState)(SetCategories)
