// React dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Meteor dependencies
import { createContainer } from 'meteor/react-meteor-data';

// Shapes
import QuestionShape from '../shapes/QuestionShape';

// Components
import LoadingIcon from '../components/shared/LoadingIcon';
import QuestionsTable from '../components/shared/QuestionsTable';

import { Questions } from '../../api/questions/questions.js';

const propTypes = {
  questions: PropTypes.arrayOf(QuestionShape).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function QuestionIndex({ questions, isLoading }) {
  if (isLoading) {
    return <LoadingIcon />;
  } else {
    return (
      <QuestionsTable questions={questions} />
    );
  }
}

QuestionIndex.propTypes = propTypes;

export default createContainer((props) => {
  const questionsHandle = Meteor.subscribe('questions.approved');
  const isLoading = !questionsHandle.ready();
  const questions = Questions.find({ status: 'approved' }, { sort: { createdAt: -1 } }).fetch();
  return Object.assign(
    {
      questions,
      isLoading,
    },
    // Pass through everything that came from the router
    props
  );
}, QuestionIndex);
