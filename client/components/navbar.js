import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {AppBar} from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation';


const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <AppBar title="Fundsy">
      {isLoggedIn ? (
        <Navigation type="horizontal">
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
          <Link to="/expenses" >Expenses</Link>
          <Link to="/link-account">Link Your Account</Link>
          <Link to="/account-settings">Account Settings</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </Navigation>
      ) : (
        <Navigation type="horizontal">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </Navigation>
      )}
    </AppBar>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
