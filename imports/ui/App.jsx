import React, { PropTypes } from 'react';
import Navbar from './Navbar';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import UserShape from './shapes/UserShape';

const propTypes = {
  user: UserShape,
};

class App extends React.Component {

  getChildContext() {
    const user = this.props.user;
    const id = user ? user._id : null;
    const isLoggedIn = !!id;
    return {
      isAdmin: isLoggedIn && Roles.userIsInRole(id, ['admin']),
      isLoggedIn,
    };
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;
App.childContextTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, App);
