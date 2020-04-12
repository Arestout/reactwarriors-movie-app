import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import AppContextHOC from '../HOC/AppContextHOC';

class Header extends Component {
  render() {
    const { user, toggleLoginModal } = this.props;
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
          {user ? (
            <UserMenu />
          ) : (
            <button
              className="btn btn-success"
              type="button"
              onClick={toggleLoginModal}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    );
  }
}

export default AppContextHOC(Header);
