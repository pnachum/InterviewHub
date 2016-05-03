import React, { PropTypes } from 'react';
import Markdown from 'react-remarkable';
import QuestionShape from '../shapes/QuestionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import { Meteor } from 'meteor/meteor';

const propTypes = {
  question: QuestionShape.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

class QuestionShow extends React.Component {

  componentDidUpdate(prevProps, prevState, prevContext) {
    const { isAdmin, question } = this.props;
    // When an admin is on this page and logs out
    if (!isAdmin && (question == null || question.status !== 'approved')) {
      this.context.router.push('/');
    }
  }

  render() {
    const { question } = this.props;
    if (question != null) {
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
  const userId = Meteor.userId();
  return Object.assign(
    {
      question: Questions.findOne(id),
      // For some reason, using context like in QuestionNew and AdminApp to access isLoggedIn and
      // isAdmin doesn't trigger componentDidUpdate when the user logs out. So handle it here
      // instead, which unfortunately duplicates the logic
      isAdmin: !!userId && Roles.userIsInRole(userId, ['admin']),
    },
    // Pass through everything that came from the router
    props
  );
}, QuestionShow);
