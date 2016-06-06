import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AccountsUIWrapper from './AccountsUIWrapper.jsx'

export default function Navbar(props, { isAdmin }) {
  return (
    <nav className="navbar navbar-default">
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><Link to="/">All questions</Link></li>
          <li><Link to="/new">Submit question</Link></li>
          {isAdmin && <li><Link to="admin">Admin</Link></li>}
          <li><AccountsUIWrapper /></li>
          {/*<li><a href="#" {{action 'randomQuestion'}}>Random question</a></li>*/}
        </ul>
      </div>
    </nav>
  );
}

Navbar.contextTypes = {
  isAdmin: PropTypes.bool,
}
