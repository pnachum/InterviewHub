import React, { PropTypes } from 'react';
import AdminQuestionsTable from '../admin/AdminQuestionsTable';
import QuestionShape from '../shapes/QuestionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import { Meteor } from 'meteor/meteor';
import LoadingIcon from '../shared/LoadingIcon';

const propTypes = {
  questions: PropTypes.arrayOf(QuestionShape).isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  updateQuestionStatus: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function AdminQuestions({
  questions,
  deleteQuestion,
  updateQuestionStatus,
  isLoading,
}) {
  if (isLoading) {
    return <LoadingIcon />;
  } else {
    return (
      <AdminQuestionsTable
        questions={questions}
        onDelete={(question) => deleteQuestion(question._id)}
        onApprove={(question) => updateQuestionStatus(question._id, 'approved')}
        onReject={(question) => updateQuestionStatus(question._id, 'rejected')}
      />
    );
  }
}

AdminQuestions.propTypes = propTypes;

export default createContainer(() => {
  const questionsHandle = Meteor.subscribe('questions.all');
  const isLoading = !questionsHandle.ready();
  return {
    questions: Questions.find({}).fetch(),
    deleteQuestion: (id) => Meteor.call('questions.remove', id),
    updateQuestionStatus: (id, status) => Meteor.call('questions.update', id, { status }),
    isLoading,
  };
}, AdminQuestions);
