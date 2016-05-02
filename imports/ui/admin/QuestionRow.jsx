import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QuestionShape from '../shapes/QuestionShape';
import { Button, Glyphicon } from 'react-bootstrap';

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
        <Button
          bsStyle="success"
          disabled={question.status === 'approved'}
          onClick={onApprove}
        >
          <Glyphicon glyph="ok" />
        </Button>

        <Button
          bsStyle="success"
          disabled={question.status === 'rejected'}
          onClick={onReject}
        >
          <Glyphicon glyph="remove" />
        </Button>
      </td>

      <td>
        <Button
          bsStyle="danger"
          onClick={onDelete}
        >
          <Glyphicon glyph="trash" />
        </Button>
      </td>
    </tr>
  );
}

QuestionRow.propTypes = propTypes;
