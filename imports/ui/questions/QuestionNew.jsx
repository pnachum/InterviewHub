import React, { PropTypes } from 'react';
import { pick } from 'lodash';
import QuestionForm from './QuestionForm';
import { Link } from 'react-router';

export default class QuestionNew extends React.Component {

  componentDidUpdate(prevProps, prevState, prevContext) {
    // When a user is on this page and logs out
    if (!this.context.isLoggedIn) {
      this.context.router.push('/');
    }
  }

  onSubmit(questionData) {
    Meteor.call('questions.insert', questionData);
    alert("Thanks for submitting your question! It's awaiting approval.");
    this.context.router.push('/');
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
  isLoggedIn: PropTypes.bool,
};
