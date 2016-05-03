import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AccountsUIWrapper from './AccountsUIWrapper.jsx'

const propTypes = {
  currentUserId: PropTypes.string,
};

export default function Navbar({ currentUserId }) {
  return (
    <nav className="navbar navbar-default">
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><Link to="/">All questions</Link></li>
          {currentUserId && <li><Link to="/new">Submit question</Link></li>}
          <li><AccountsUIWrapper /></li>
          {/*<li><a href="#" {{action 'randomQuestion'}}>Random question</a></li>*/}
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = propTypes;
