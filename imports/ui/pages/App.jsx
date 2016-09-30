import React, { PropTypes } from 'react';
import Navbar from '../components/shared/Navbar';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import UserShape from '../shapes/UserShape';
import { isUserAdmin } from '../../helpers/Roles';
import { withContext } from 'recompose';

const propTypes = {
  user: UserShape,
  children: PropTypes.node.isRequired,
};

const styles = {
  appContent: {
    margin: 10,
  },
};

const childContextTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

function getChildContext({ user }) {
  const id = user ? user._id : null;
  return {
    isAdmin: isUserAdmin(id),
    isLoggedIn: !!id,
  };
}

function App({ children, user }) {
  return (
    <div>
      <Navbar />
      <div style={styles.appContent}>
        {children}
      </div>
    </div>
  );
}

App.propTypes = propTypes;

const AppWithContext = withContext(
  childContextTypes,
  getChildContext
)(App);

export default createContainer((props) => {
  return Object.assign(
    { user: Meteor.user() },
    // Pass through everything that came from the router
    props
  );
}, AppWithContext);
