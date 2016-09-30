// @flow

import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import type { Question } from '../../shapes/QuestionShape';
import { ApproveButton, RejectButton, DeleteButton } from '../shared/Buttons';

type Props = {
  question: Question,
  onDelete: (e: Event) => void,
  onApprove: (e: Event) => void,
  onReject: (e: Event) => void,
  hasStatusColumn: boolean,
  hasApprovalColumn:boolean,
  hasDeleteColumn: boolean,
  router: Object,
};

function transitionToQuestion(id: string, router: Object): void {
  router.push(`/${id}`);
}

// Intercept the click events on the buttons to prevent button clicks from propagating to the row
function clickIntercept(event: Event, handlerFunc: (e: Event) => void): void {
  event.stopPropagation();
  handlerFunc(event);
}

function QuestionRow({
  question,
  onDelete,
  onApprove,
  onReject,
  hasStatusColumn = false,
  hasApprovalColumn = false,
  hasDeleteColumn = false,
  router,
}: Props) {
  const { _id, title, status } = question;
  return (
    <tr
      onClick={() => transitionToQuestion(_id, router)}
      style={styles.row}
    >
      <td>
        <Link to={`/${_id}`}>{title}</Link>
      </td>

      {hasStatusColumn && (
        <td>
          {status}
        </td>
      )}

      {hasApprovalColumn && (
        <td>
          <ApproveButton
            disabled={status === 'approved'}
            onClick={(e) => clickIntercept(e, onApprove)}
          />

          <RejectButton
            disabled={status === 'rejected'}
            onClick={(e) => clickIntercept(e, onReject)}
          />
        </td>
      )}

      {hasDeleteColumn && (
        <td>
          <DeleteButton onClick={(e) => clickIntercept(e, onDelete)} />
        </td>
      )}
    </tr>
  );
}

const styles = {
  row: {
    cursor: 'pointer',
  },
};

export default withRouter(QuestionRow);
