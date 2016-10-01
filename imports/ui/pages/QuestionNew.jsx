// @flow

import React, { PropTypes } from 'react';
import QuestionForm from '../components/questions/QuestionForm';
import { Link, withRouter } from 'react-router';
import { insert } from '../../api/questions/methods.js';
import withUserInfo from '../../helpers/withUserInfo';
import type { Question } from '../shapes/QuestionShape';

type Props = {
  router: Object,
  isAdmin: boolean,
};

function onSubmit(questionData: Question, isAdmin: boolean, router: Object) {
  insert.call(questionData);
  alert("Thanks for submitting your question! It's awaiting approval.");
  // Redirect admins to the admin page after submitting a question
  const route = isAdmin ? '/admin' : '/';
  router.push(route);
}

function QuestionNew({ router, isAdmin }: Props) {
  return (
    <div>
      <strong>Guidelines</strong>
      <ul>
        <li>Make sure your question isn't already in the <Link to="/">list of all questions</Link></li>
        <li>Only submit real questions you've actually been asked in technical interviews</li>
        <li>If possible, include at least one test case</li>
        <li>Don't include the name of the company in the question</li>
      </ul>

      <QuestionForm onSubmit={(questionData) => onSubmit(questionData, isAdmin, router)} />
    </div>
  );
}

export default withUserInfo(withRouter(QuestionNew));
