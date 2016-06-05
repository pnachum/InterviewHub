import React, { PropTypes } from 'react';
import { pick } from 'lodash';
import QuestionForm from '../questions/QuestionForm';
import { Link } from 'react-router';

export default class QuestionNew extends React.Component {

  onSubmit(questionData) {
    const { isAdmin, router } = this.context;
    Meteor.call('questions.insert', questionData);
    alert("Thanks for submitting your question! It's awaiting approval.");
    // Redirect admins to the admin page after submitting a question
    const route = isAdmin ? '/admin' : '/';
    router.push(route);
  }

  render() {
    return (
      <div>
        <strong>Guidelines</strong>
        <ul>
          <li>Make sure your question isn't already in the <Link to="/">list of all questions</Link></li>
          <li>Only submit real questions you've actually been asked in technical interviews</li>
          <li>If possible, include at least one test case</li>
          <li>Don't include the name of the company in the question</li>
        </ul>

        <QuestionForm onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

QuestionNew.contextTypes = {
  router: PropTypes.object,
  isAdmin: PropTypes.bool,
};
