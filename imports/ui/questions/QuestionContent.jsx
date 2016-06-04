import React, { PropTypes } from 'react';
import QuestionShape from '../shapes/QuestionShape';
import Markdown from 'react-remarkable';

const propTypes = {
  question: QuestionShape.isRequired,
};

export default function QuestionContent({ question }) {
  const { title, content } = question;

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <Markdown source={content} />
      </div>
    </div>
  );
}

QuestionContent.propTypes = propTypes;
