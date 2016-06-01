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
    return { user: this.props.user }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar userId={user ? user._id : null} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;
App.childContextTypes = propTypes;

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, App);
