import React, { PropTypes } from 'react';

// Copied from the React Router implementation of withRouter
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

// A higher-order component which passes isLoggedIn and isAdmin from the App component's
// context into the wrapped component. This centralizes the dependency on React's contextTypes
// API into just two places: this function, and the App component. Inspired by React Router's
// withRouter function
export default function withUserInfo(WrappedComponent) {
  function WithUserInfo(props, { isLoggedIn, isAdmin }) {
    return <WrappedComponent {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />;
  }

  WithUserInfo.contextTypes = {
    isLoggedIn: PropTypes.bool,
    isAdmin: PropTypes.bool,
  };

  WithUserInfo.displayName = `withUserInfo(${getDisplayName(WrappedComponent)})`
  WithUserInfo.WrappedComponent = WrappedComponent;

  return WithUserInfo;
}
