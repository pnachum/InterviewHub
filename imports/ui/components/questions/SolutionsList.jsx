// @flow

import React, { PropTypes } from 'react';
import type { Solution } from '../../shapes/SolutionShape';
import Markdown from 'react-remarkable';

type Props = {
  solutions: Solution[],
};

export default function SolutionsList({ solutions }: Props) {
  if (solutions && solutions.length) {
    return (
      <div>
        {solutions.map(({ _id, content }) => {
          return (
            <div key={_id}>
              <Markdown source={content} />
              <hr />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <p>No solutions yet. Be the first to submit one!</p>;
  }
}
