import React, { PropTypes } from 'react';
import QuestionRow from './QuestionRow';
import QuestionShape from '../shapes/QuestionShape';
import { Table } from 'react-bootstrap';

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
    <Table responsive hover>
      <thead>
      </thead>

      <tbody>
        {questions.map((question) => {
          return (
            <QuestionRow
              question={question}
              key={question._id}
              onDelete={(e) => onDelete(question)}
              onApprove={(e) => onApprove(question)}
              onReject={(e) => onReject(question)}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

AdminQuestionsTable.propTypes = propTypes;
