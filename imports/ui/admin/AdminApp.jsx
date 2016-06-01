import React, { PropTypes } from 'react';
import UserShape from '../shapes/UserShape';

export default class AdminApp extends React.Component {

  componentDidUpdate(prevProps, prevState, prevContext) {
    // When a user is on this page and logs out
    if (!this.context.user) {
      this.context.router.push('/');
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

AdminApp.contextTypes = {
  router: PropTypes.object,
  user: UserShape,
};
