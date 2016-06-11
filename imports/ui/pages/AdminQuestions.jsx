// Reaact dependencies
import React, { PropTypes } from 'react';

// Meteor dependencies
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Shapes
import QuestionShape from '../shapes/QuestionShape';

// Methods
import { remove, update } from '../../api/questions/methods';

// Components
import LoadingIcon from '../components/shared/LoadingIcon';
import AdminQuestionsTable from '../components/admin/AdminQuestionsTable';

import { Questions } from '../../api/questions/questions';

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
    questions: Questions.find({}, { sort: { createdAt: -1 } }).fetch(),
    deleteQuestion: (questionId) => remove.call({ questionId }),
    updateQuestionStatus: (questionId, status) => update.call({ questionId, data: { status } }),
    isLoading,
  };
}, AdminQuestions);
