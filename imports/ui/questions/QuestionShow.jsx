import React, { PropTypes } from 'react';
import Markdown from 'react-remarkable';
import QuestionShape from '../shapes/QuestionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';

const propTypes = {
  question: QuestionShape.isRequired,
};

class QuestionShow extends React.Component {

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
  const question = Questions.findOne(params.id);
  return {
    question: question,
  };
}, QuestionShow);
