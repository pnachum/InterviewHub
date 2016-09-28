// @flow

import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import withUserInfo from '../../helpers/withUserInfo';

type Props = {
  router: Object,
  isAdmin: boolean,
  children: any,
};

class AdminApp extends React.Component {
  props: Props;

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

export default withUserInfo(withRouter(AdminApp));
