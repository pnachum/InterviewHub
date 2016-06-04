import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QuestionShape from '../shapes/QuestionShape';
import { ApproveButton, RejectButton, DeleteButton } from '../shared/Buttons';

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
  onReject,
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
        <ApproveButton
          disabled={status === 'approved'}
          onClick={onApprove}
        />

        <RejectButton
          disabled={status === 'rejected'}
          onClick={onReject}
        />
      </td>

      <td>
        <DeleteButton onClick={onDelete} />
      </td>
    </tr>
  );
}

QuestionRow.propTypes = propTypes;
