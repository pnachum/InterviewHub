import React, { PropTypes } from 'react';
import AdminQuestionsTable from './AdminQuestionsTable';
import QuestionShape from '../shapes/QuestionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import { Meteor } from 'meteor/meteor';

const propTypes = {
  questions: PropTypes.arrayOf(QuestionShape).isRequired,
};

class AdminQuestions extends React.Component {

  constructor(props) {
    super(props);

    this.onApprove = this.onApprove.bind(this);
    this.onReject = this.onReject.bind(this);
  }

  onDelete(question) {
    Meteor.call('questions.remove', question._id);
  }

  onApprove(question) {
    this.updateQuestionStatus(question, 'approved');
  }

  onReject(question) {
    this.updateQuestionStatus(question, 'rejected');
  }

  updateQuestionStatus(question, status) {
    Meteor.call('questions.setStatus', question._id, status);
  }

  render() {
    const { questions } = this.props;

    return (
      <AdminQuestionsTable
        questions={questions}
        onDelete={this.onDelete}
        onApprove={this.onApprove}
        onReject={this.onReject}
      />
    );
  }
}

AdminQuestions.propTypes = propTypes;

export default createContainer(() => {
  Meteor.subscribe('questions.all');
  return {
    questions: Questions.find({}).fetch(),
  };
}, AdminQuestions);
