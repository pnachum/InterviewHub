// @flow

// React dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Meteor dependencies
import { createContainer } from 'meteor/react-meteor-data';
import Meteor from 'meteor/meteor';

// Shapes
import type { Question } from '../shapes/QuestionShape';

// Components
import LoadingIcon from '../components/shared/LoadingIcon';
import QuestionsTable from '../components/shared/QuestionsTable';

import { Questions } from '../../api/questions/questions.js';

type Props = {
  questions: Question[],
  isLoading: boolean,
};

function QuestionIndex({ questions, isLoading }: Props) {
  if (isLoading) {
    return <LoadingIcon />;
  } else {
    return (
      <QuestionsTable questions={questions} />
    );
  }
}

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
