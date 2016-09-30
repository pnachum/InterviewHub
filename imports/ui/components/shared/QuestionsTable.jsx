import React, { PropTypes } from 'react';
import QuestionShape from '../../shapes/QuestionShape';
import { Table } from 'react-bootstrap';
import QuestionRow from './QuestionRow';

const propTypes = {
  questions: PropTypes.arrayOf(QuestionShape).isRequired,
  onDelete: PropTypes.func,
  onApprove: PropTypes.func,
  onReject: PropTypes.func,
  hasStatusColumn: PropTypes.bool,
  hasApprovalColumn: PropTypes.bool,
  hasDeleteColumn: PropTypes.bool,
};

const defaultProps = {
  onDelete: () => {},
  onApprove: () => {},
  onReject: () => {},
  hasStatusColumn: false,
  hasApprovalColumn: false,
  hasDeleteColumn: false
};

export default function QuestionsTable({
  questions,
  onDelete,
  onApprove,
  onReject,
  hasStatusColumn,
  hasApprovalColumn,
  hasDeleteColumn,
}) {
  return (
    <Table responsive hover>
      <tbody>
        {questions.map((question) => {
          return (
            <QuestionRow
              question={question}
              key={question._id}
              onDelete={(e) => onDelete(question)}
              onApprove={(e) => onApprove(question)}
              onReject={(e) => onReject(question)}
              hasStatusColumn={hasStatusColumn}
              hasApprovalColumn={hasApprovalColumn}
              hasDeleteColumn={hasDeleteColumn}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

QuestionsTable.propTypes = propTypes;
QuestionsTable.defaultProps = defaultProps;
