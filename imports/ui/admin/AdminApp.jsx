import React, { PropTypes } from 'react';

export default class AdminApp extends React.Component {

  componentDidUpdate(prevProps, prevState, prevContext) {
    // When an admin is on this page and logs out
    if (!this.context.isAdmin) {
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
  isAdmin: PropTypes.bool,
};
