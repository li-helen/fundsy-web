import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Layout} from 'react-toolbox/lib/layout'
import {UncategorizedTransactions} from '../components'


/**
 * COMPONENT
 */

export class UserHome extends React.Component {
  render() {
    const {email} = this.props
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <UncategorizedTransactions />
      </div>
    )
  }
}

// /**
//  * CONTAINER
//  */
const mapState = state => {
  return {
    email: state.user.email,
  }
}


export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
UserHome.propTypes = {
  email: PropTypes.string
}

