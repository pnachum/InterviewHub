import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import withUserInfo from '../../helpers/withUserInfo';

const propTypes = {
  router: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
};

class AdminApp extends React.Component {

  componentDidUpdate(prevProps, prevState, prevContext) {
    const { router, isAdmin } = this.props;
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

export default withUserInfo(withRouter(AdminApp));
