import React, { PropTypes } from 'react';
import Markdown from 'react-remarkable';
import QuestionShape from '../shapes/QuestionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import { Meteor } from 'meteor/meteor';

const propTypes = {
  question: QuestionShape.isRequired,
  isCurrentUserAdmin: PropTypes.bool.isRequired,
};

class QuestionShow extends React.Component {

  // TODO: This needs to redirect back to index for non-admin users when the question is not
  // approved
  componentWillMount() {
    // const { question, isCurrentUserAdmin, history } = this.props;
    // if (question.status !== 'approved' && !isCurrentUserAdmin) {
    //   history.push('/');
    // }
  }

  render() {
    const { question } = this.props;
    if (question) {
      return (
        <div>
          <h2>{question.title}</h2>
          <div>
            <Markdown source={question.content} />
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>
    }
  }
}

export default createContainer(({ params }) => {
  Meteor.subscribe('question', params.id);
  return {
    question: Questions.findOne(params.id),
    // TODO: Fix this once admin stuff is set up
    isCurrentUserAdmin: Meteor.userId(),
  };
}, QuestionShow);
