import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'react-toolbox/lib/input'
import{ Button }from 'react-toolbox/lib/button'

class SetCategories extends React.Component {
    constructor() {
        super()
        this.state = {
            categoryCount: 2,
            // categories: {}
        }
    }

    addCategory = () => {
        this.setState(prevState => {
            return {categoryCount: prevState.categoryCount + 1}
        })
    }
    render(){
        console.log('categoryCount is now: ', this.state.categoryCount)
        return (
            <div>
                <h3>Add up to 5 categories.</h3>
                <Button onClick={this.addCategory}>Add a category</Button>
            </div>
        )
    }
}

const mapState = state => {
    return {
        userId: state.user.id,
    }
}

export default connect(mapState)(SetCategories)

