import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from '../imports/startup/client/routes';

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('root'));
});
