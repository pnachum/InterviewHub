import React, { PropTypes } from 'react';
import QuestionShape from '../shapes/QuestionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import { Meteor } from 'meteor/meteor';
import QuestionForm from './QuestionForm';
import QuestionContent from './QuestionContent';

const propTypes = {
  question: QuestionShape.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

class QuestionShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };

    this.edit = this.edit.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const { isAdmin, question } = this.props;
    // When an admin is on this page and logs out
    if (!isAdmin && (question == null || question.status !== 'approved')) {
      this.transitionToIndex();
    }
  }

  transitionToIndex() {
    this.context.router.push('/');
  }

  deleteQuestion(questionId) {
    Meteor.call('questions.remove', questionId);
    this.transitionToIndex();
  }

  edit() {
    this.setState({ isEditing: true });
  }

  doneEditing(question, data) {
    Meteor.call('questions.update', question._id, data);
    this.setState({ isEditing: false });
  }

  render() {
    const { question, isAdmin } = this.props;

    if (question != null) {
      const { content, title } = question;
      if (this.state.isEditing) {
        return (
          <QuestionForm
            onSubmit={(data) => this.doneEditing(question, data)}
            content={content}
            title={title}
          />
        );
      } else {
        return (
          <QuestionContent
            question={question}
            onDelete={this.deleteQuestion}
            onEdit={this.edit}
            canEdit={isAdmin}
          />
        );
      }
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
