// @flow

import React, { PropTypes } from 'react';
import type { Solution } from '../../shapes/SolutionShape';
import QuestionSolution from './QuestionSolution';

type Props = {
  solutions: Solution[],
};

export default function SolutionsList({ solutions }: Props) {
  if (solutions && solutions.length) {
    return (
      <div>
        {solutions.map(solution => <QuestionSolution key={solution._id} solution={solution} />)}
      </div>
    );
  } else {
    return <p>No solutions yet. Be the first to submit one!</p>;
  }
}
