import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../../ui/pages/App.jsx';
import AdminApp from '../../ui/pages/AdminApp';
import AdminQuestions from '../../ui/pages/AdminQuestions';

import QuestionIndex from '../../ui/pages/QuestionIndex';
import QuestionShow from '../../ui/pages/QuestionShow';
import QuestionNew from '../../ui/pages/QuestionNew';
import QuestionApp from '../../ui/pages/QuestionApp';

import { isUserAdmin } from '../../helpers/Roles';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="admin" component={AdminApp} onEnter={requireAdmin}>
        <IndexRoute component={AdminQuestions} />
      </Route>

      <Route path="" component={QuestionApp}>
        <IndexRoute component={QuestionIndex} />
        <Route path="new" component={QuestionNew} />
        <Route path=":id" component={QuestionShow} />
      </Route>
    </Route>
  </Router>
);

function requireAdmin(nextState, replace) {
  const id = Meteor.userId();

  // When an admin is on the admin page and refreshes the page, the app gets into a weird state
  // where Meteor.userId() exists (because the user is logged in), but the user document hasn't
  // been loaded, so Meteor.user() is undefined. In this state, the user fails Roles.userIsInRole(),
  // because the user object doesn't exist. So this also checks that the user has been loaded
  // before checking if they are an admin
  const isNotAdmin = Meteor.user() && !isUserAdmin(id);

  if (!id || isNotAdmin) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

