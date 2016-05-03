import React, { PropTypes } from 'react';
import Navbar from './Navbar';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const propTypes = {
  currentUserId: PropTypes.string,
}

export default function App({ children, currentUserId }) {
  return (
    <div>
      <Navbar currentUserId={currentUserId} />
      {children}
    </div>
  );
}

export default createContainer(() => {
  return {
    currentUserId: Meteor.userId(),
  };
}, App);
