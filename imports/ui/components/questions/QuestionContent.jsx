import React, { PropTypes } from 'react';
import QuestionShape from '../../shapes/QuestionShape';
import Markdown from 'react-remarkable';
import { PageHeader } from 'react-bootstrap';

const propTypes = {
  question: QuestionShape.isRequired,
};

export default function QuestionContent({ question }) {
  const { title, content } = question;

  return (
    <div>
      <PageHeader>{title}</PageHeader>
      <div>
        <Markdown source={content} />
      </div>
    </div>
  );
}

QuestionContent.propTypes = propTypes;
