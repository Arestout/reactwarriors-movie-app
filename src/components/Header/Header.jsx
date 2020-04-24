import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { withAuth } from '../../hoc/withAuth';

class Header extends Component {
  render() {
    const { auth, authActions } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
          {auth.user ? (
            <UserMenu />
          ) : (
            <button
              className="btn btn-success"
              type="button"
              onClick={authActions.toggleLoginModal}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    );
  }
}

export default withAuth(Header);
