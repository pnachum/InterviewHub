import React, { PropTypes } from 'react';
import { getContext } from 'recompose';

export default function withUserInfo(WrappedComponent) {
  return getContext({
    isLoggedIn: PropTypes.bool,
    isAdmin: PropTypes.bool,
  })(WrappedComponent);
}
