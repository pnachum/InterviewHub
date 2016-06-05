import React, { PropTypes } from 'react';
import Navbar from '../shared/Navbar';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import UserShape from '../shapes/UserShape';

const propTypes = {
  user: UserShape,
};

class App extends React.Component {

  getChildContext() {
    const user = this.props.user;
    const id = user ? user._id : null;
    const isLoggedIn = !!id;
    return {
      // Gross global reference to Roles from alanning/meteor-roles
      isAdmin: isLoggedIn && Roles.userIsInRole(id, ['admin']),
      isLoggedIn,
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <div style={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const styles = {
  appContent: {
    margin: 10,
  },
};

App.propTypes = propTypes;
App.childContextTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export default createContainer((props) => {
  return Object.assign(
    { user: Meteor.user() },
    // Pass through everything that came from the router
    props
  );
}, App);
