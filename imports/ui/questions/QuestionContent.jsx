import React, { PropTypes } from 'react';
import QuestionShape from '../shapes/QuestionShape';
import { Button, Glyphicon } from 'react-bootstrap';
import Markdown from 'react-remarkable';

const propTypes = {
  question: QuestionShape.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
};

const defaultProps = {
  onDelete: () => {},
  onEdit: () => {},
  canEdit: false,
};

export default function QuestionContent({ question, onDelete, onEdit, canEdit }) {
  const { title, content, _id } = question;

  return (
    <div>
      <h2>{title}</h2>
      {canEdit && (
        <div>
          <Button
            bsStyle="danger"
            onClick={() => onDelete(_id)}
          >
            <Glyphicon glyph="trash" />
          </Button>

          <Button
            bsStyle="warning"
            onClick={onEdit}
          >
            <Glyphicon glyph="pencil" />
          </Button>
        </div>
      )}
      <div>
        <Markdown source={content} />
      </div>

    </div>
  );
}

QuestionContent.propTypes = propTypes;
