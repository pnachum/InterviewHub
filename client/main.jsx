import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../imports/ui/pages/App.jsx';
import AdminApp from '../imports/ui/pages/AdminApp';
import AdminQuestions from '../imports/ui/pages/AdminQuestions';

import QuestionIndex from '../imports/ui/pages/QuestionIndex';
import QuestionShow from '../imports/ui/pages/QuestionShow';
import QuestionNew from '../imports/ui/pages/QuestionNew';
import QuestionApp from '../imports/ui/pages/QuestionApp';

Meteor.startup(() => {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="admin" component={AdminApp} onEnter={requireAdmin}>
          <IndexRoute component={AdminQuestions} />
        </Route>

        <Route path="" component={QuestionApp}>
          <IndexRoute component={QuestionIndex} />
          <Route path="new" component={QuestionNew} onEnter={requireAuth} />
          <Route path=":id" component={QuestionShow} />
        </Route>
      </Route>
    </Router>
  ), document.getElementById('root'));
});

function requireAuth(nextState, replace) {
  if (!Meteor.userId()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function requireAdmin(nextState, replace) {
  const id = Meteor.userId();

  // When an admin is on the admin page and refreshes the page, the app gets into a weird state
  // where Meteor.userId() exists (because the user is logged in), but the user document hasn't
  // been loaded, so Meteor.user() is undefined. In this state, the user fails Roles.userIsInRole(),
  // because the user object doesn't exist. So this also checks that the user has been loaded
  // before checking if they are an admin
  const isNotAdmin = Meteor.user() && !Roles.userIsInRole(id, ['admin']);

  if (!id || isNotAdmin) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
