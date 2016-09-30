// @flow

import React, { PropTypes } from 'react';
import Navbar from '../components/shared/Navbar';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import type { User } from '../shapes/UserShape';
import { isUserAdmin } from '../../helpers/Roles';
import { withContext } from 'recompose';

type Props = {
  user: User,
  children: any,
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

function App({ children, user }: Props) {
  return (
    <div>
      <Navbar />
      <div style={styles.appContent}>
        {children}
      </div>
    </div>
  );
}

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
