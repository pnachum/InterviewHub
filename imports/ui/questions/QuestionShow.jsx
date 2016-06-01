import React, { PropTypes } from 'react';
import Markdown from 'react-remarkable';
import QuestionShape from '../shapes/QuestionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import { Meteor } from 'meteor/meteor';
import UserShape from '../shapes/UserShape';

const propTypes = {
  question: QuestionShape.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

class QuestionShow extends React.Component {

  componentDidUpdate(prevProps, prevState, prevContext) {
    const { isLoggedIn, question } = this.props;
    // When a user is on this page and logs out
    if (!isLoggedIn && question.status !== 'approved') {
      this.context.router.push('/');
    }
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

QuestionShow.contextTypes = {
  router: PropTypes.object,
};

export default createContainer((props) => {
  const id = props.params.id;
  Meteor.subscribe('question', id);
  return Object.assign(
    {
      question: Questions.findOne(id),
      // For some reason, using context like in QuestionNew and AdminApp to access user doesn't
      // trigger componentDidUpdate when the user logs out. So handle it here instead.
      isLoggedIn: !!Meteor.userId(),
    },
    // Pass through everything that came from the router
    props
  );
}, QuestionShow);
