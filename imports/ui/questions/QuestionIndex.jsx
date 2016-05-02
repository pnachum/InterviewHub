import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import QuestionShape from '../shapes/QuestionShape';

const propTypes = {
  questions: PropTypes.arrayOf(QuestionShape).isRequired,
};

class QuestionIndex extends React.Component {

  render() {
    const { questions } = this.props;
    return (
      <div>
        <ul>
          {
            questions.map((question) => {
              return (
                <li key={question._id}>
                  <Link to={`/${question._id}`}>
                    {question.title}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

QuestionIndex.propTypes = propTypes;

export default createContainer(() => {
  Meteor.subscribe('questions.approved');
  return {
    questions: Questions.find({ status: 'approved' }).fetch(),
  };
}, QuestionIndex);
