import React, { PropTypes } from 'react';
import { pick } from 'lodash';
import QuestionForm from '../components/questions/QuestionForm';
import { Link } from 'react-router';
import { insert } from '../../api/questions/methods.js';

function onSubmit(questionData, isAdmin, router) {
  insert.call(questionData);
  alert("Thanks for submitting your question! It's awaiting approval.");
  // Redirect admins to the admin page after submitting a question
  const route = isAdmin ? '/admin' : '/';
  router.push(route);
}

export default function QuestionNew(props, { isAdmin, router }) {
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

QuestionNew.contextTypes = {
  router: PropTypes.object,
  isAdmin: PropTypes.bool,
};
