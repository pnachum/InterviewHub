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
  // Gross global reference to Roles from alanning/meteor-roles
  if (!id || !Roles.userIsInRole(id, ['admin'])) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
