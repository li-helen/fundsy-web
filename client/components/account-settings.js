import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Input} from 'react-toolbox/lib/input'
import {Button} from 'react-toolbox/lib/button'

class SetCategories extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  async componentDidMount() {
    const {data} = await axios.post('/api/categories/get-categories', {
      userId: this.props.userId
    })
    const userCategories = data.reduce((accum, elem) => {
        accum[elem.id] = elem.label
        return accum
    }, {})
    this.setState(userCategories)
  }

  addCategory = () => {
    this.setState(prevState => {
      return {categoryCount: prevState.categoryCount + 1}
    })
  }

  handleChange = (catId) => {
    this.setState({[catId]: event.target.value})
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <h3>My Accounts</h3>
        <h3>My Budget</h3>
        <h5>Add up to 5 categories.</h5>
        {Object.keys(this.state).length &&
          Object.keys(this.state).map(catId => (
            <Input key={catId} type="text" value={this.state[catId]} onChange={() => this.handleChange(catId)}/>
          ))}
        <Button onClick={this.addCategory}>Add a category</Button>
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
