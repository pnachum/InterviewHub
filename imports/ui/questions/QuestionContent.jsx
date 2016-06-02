import React, { PropTypes } from 'react';
import QuestionShape from '../shapes/QuestionShape';
import Markdown from 'react-remarkable';
import SolutionShape from '../shapes/SolutionShape';
import SolutionsList from './SolutionsList';

const propTypes = {
  question: QuestionShape.isRequired,
  solutions: PropTypes.arrayOf(SolutionShape).isRequired,
  onSolutionSubmit: PropTypes.func,
};

const defaultProps = {
  onSolutionSubmit: () => {},
};

export default function QuestionContent({
  question,
  solutions,
  onSolutionSubmit,
}) {
  const { title, content } = question;

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <Markdown source={content} />
      </div>

      <SolutionsList
        solutions={solutions}
        onSubmit={onSolutionSubmit}
      />
    </div>
  );
}

QuestionContent.propTypes = propTypes;
