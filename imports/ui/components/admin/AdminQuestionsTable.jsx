// @flow

import React, { PropTypes } from 'react';
import type { Question } from '../../shapes/QuestionShape';
import QuestionsTable from '../shared/QuestionsTable';

type Props = {
  questions: Question[],
  onDelete: (question: Question) => void,
  onApprove: (question: Question) => void,
  onReject: (question: Question) => void,
};

export default function AdminQuestionsTable({
  questions,
  onReject,
  onApprove,
  onDelete,
}: Props) {
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
