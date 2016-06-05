import React, { PropTypes } from 'react';
import QuestionShape from '../shapes/QuestionShape';
import QuestionsTable from '../shared/QuestionsTable';

const propTypes = {
  questions: PropTypes.arrayOf(QuestionShape),
  onDelete: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default function AdminQuestionsTable({
  questions,
  onReject,
  onApprove,
  onDelete,
}) {
  return (
    <QuestionsTable
      questions={questions}
      onDelete={onDelete}
      onApprove={onApprove}
      onReject={onReject}
      hasStatusColumn
      hasApprovalColumn
      hasDeleteColumn
    />
  );
}

AdminQuestionsTable.propTypes = propTypes;
