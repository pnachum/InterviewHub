import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../imports/ui/App.jsx';

import AdminApp from '../imports/ui/admin/AdminApp';
import AdminQuestions from '../imports/ui/admin/AdminQuestions';

import QuestionIndex from '../imports/ui/questions/QuestionIndex';
import QuestionShow from '../imports/ui/questions/QuestionShow';
import QuestionNew from '../imports/ui/questions/QuestionNew';
import QuestionApp from '../imports/ui/questions/QuestionApp';

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
  {/* TODO: Change to actually require admin credentials */}
  requireAuth(...arguments);
}
