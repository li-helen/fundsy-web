import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Layout} from 'react-toolbox/lib/layout'
import {UncategorizedTransactions} from '../components'
import { fetchCategorized, fetchUncategorized } from '../store'

/**
 * COMPONENT
 */
// export const UserHome = props => {
//   const {email} = props

//   return (
//    <Layout>
//       <h3>Welcome, {email}</h3>
//    </Layout>
//   )
// }

export class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchUncategorized(this.props.userId)
    this.props.fetchCategorized(this.props.userId)
  }

  render() {
    const {email} = this.props
    return (
      // <Layout>
      //   <h3>Welcome, {email}</h3>
      // </Layout>
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
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCategorized: (userId) => dispatch(fetchCategorized(userId)),
    fetchUncategorized: (userId) => dispatch(fetchUncategorized(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

// /**
//  * PROP TYPES
//  */
UserHome.propTypes = {
  email: PropTypes.string
}

