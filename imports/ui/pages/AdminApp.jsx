import React, { PropTypes } from 'react';

export default class AdminApp extends React.Component {

  componentDidUpdate(prevProps, prevState, prevContext) {
    const { isAdmin, router } = this.context;
    // When an admin is on this page and logs out
    if (!isAdmin) {
      router.push('/');
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
