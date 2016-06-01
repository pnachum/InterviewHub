import React, { PropTypes } from 'react';
import QuestionRow from './QuestionRow';
import QuestionShape from '../shapes/QuestionShape';

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
    <table className="table">
      <thead>
        <tr>
          <th>Question</th>
          <th>Status</th>
        </tr>
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
    </table>
  );
}

AdminQuestionsTable.propTypes = propTypes;
