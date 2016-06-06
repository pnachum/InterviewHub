import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QuestionShape from '../../shapes/QuestionShape';
import { ApproveButton, RejectButton, DeleteButton } from '../shared/Buttons';

const propTypes = {
  question: QuestionShape,
  onDelete: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  hasStatusColumn: PropTypes.bool,
  hasApprovalColumn: PropTypes.bool,
  hasDeleteColumn: PropTypes.bool,
};

const defaultProps = {
  hasStatusColumn: false,
  hasApprovalColumn: false,
  hasDeleteColumn: false,
};

function transitionToQuestion(id, router) {
  router.push(`/${id}`);
}

// Intercept the click events on the buttons to prevent button clicks from propagating to the row
function clickIntercept(event, handlerFunc) {
  event.stopPropagation();
  handlerFunc();
}

export default function QuestionRow({
  question,
  onDelete,
  onApprove,
  onReject,
  hasStatusColumn,
  hasApprovalColumn,
  hasDeleteColumn,
}, {
  router,
}) {
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

QuestionRow.propTypes = propTypes;
QuestionRow.defaultProps = defaultProps;
QuestionRow.contextTypes = {
  router: PropTypes.object,
};
