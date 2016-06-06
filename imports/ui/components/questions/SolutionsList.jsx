import React, { PropTypes } from 'react';
import SolutionShape from '../../shapes/SolutionShape';
import Markdown from 'react-remarkable';

const propTypes = {
  solutions: PropTypes.arrayOf(SolutionShape).isRequired,
};

export default function SolutionsList({ solutions }) {
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

SolutionsList.propTypes = propTypes;
