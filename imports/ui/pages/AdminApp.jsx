import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';

const propTypes = {
  router: PropTypes.object,
};

class AdminApp extends React.Component {

  componentDidUpdate(prevProps, prevState, prevContext) {
    const { isAdmin } = this.context;
    const { router } = this.props;
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

AdminApp.propTypes = propTypes;
AdminApp.contextTypes = {
  isAdmin: PropTypes.bool,
};

export default withRouter(AdminApp);
