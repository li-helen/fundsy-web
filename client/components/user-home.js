import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Layout} from 'react-toolbox/lib/layout'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
   <Layout>
      <h3>Welcome, {email}</h3>
   </Layout>
  )
}

// /**
//  * CONTAINER
//  */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
UserHome.propTypes = {
  email: PropTypes.string
}

