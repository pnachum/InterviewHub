import React, { PropTypes } from 'react';
import AdminQuestionsTable from './AdminQuestionsTable';
import QuestionShape from '../shapes/QuestionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import { Meteor } from 'meteor/meteor';

const propTypes = {
  questions: PropTypes.arrayOf(QuestionShape).isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  updateQuestionStatus: PropTypes.func.isRequired,
};

function AdminQuestions({
  questions,
  deleteQuestion,
  updateQuestionStatus,
}) {
  return (
    <AdminQuestionsTable
      questions={questions}
      onDelete={(question) => deleteQuestion(question._id)}
      onApprove={(question) => updateQuestionStatus(question._id, 'approved')}
      onReject={(question) => updateQuestionStatus(question._id, 'rejected')}
    />
  );
}

AdminQuestions.propTypes = propTypes;

export default createContainer(() => {
  Meteor.subscribe('questions.all');
  return {
    questions: Questions.find({}).fetch(),
    deleteQuestion: (id) => Meteor.call('questions.remove', id),
    updateQuestionStatus: (id, status) => Meteor.call('questions.update', id, { status }),
  };
}, AdminQuestions);
