import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QuestionShape from '../shapes/QuestionShape';
import { Button, Glyphicon } from 'react-bootstrap';

const propTypes = {
  question: QuestionShape,
  onDelete: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default function QuestionRow({
  question,
  onDelete,
  onApprove,
  onReject
}) {
  const { _id, title, status } = question;
  return (
    <tr>
      <td>
        <Link to={`/${_id}`}>{title}</Link>
      </td>

      <td>
        {status}
      </td>

      <td>
        <Button
          bsStyle="success"
          disabled={status === 'approved'}
          onClick={onApprove}
        >
          <Glyphicon glyph="ok" />
        </Button>

        <Button
          bsStyle="success"
          disabled={status === 'rejected'}
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
