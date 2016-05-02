import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QuestionShape from '../shapes/QuestionShape';

const propTypes = {
  question: QuestionShape,
};

export default function QuestionRow({ question, onDelete, onApprove, onReject }) {
  return (
    <tr>
      <td>
        <Link to={`/${question._id}`}>{question.title}</Link>
      </td>

      <td>
        {question.status}
      </td>

      <td>
        <button
          className="btn btn-success glyphicon glyphicon-ok"
          disabled={question.status === 'approved'}
          onClick={onApprove}
        >
        </button>

        <button
          className="btn btn-success glyphicon glyphicon-remove"
          disabled={question.status === 'rejected'}
          onClick={onReject}
        >
        </button>
      </td>

      <td>
        <button
          className="btn btn-danger glyphicon glyphicon-trash"
          onClick={onDelete}
        >
        </button>
      </td>
    </tr>
  );
}

QuestionRow.propTypes = propTypes;
