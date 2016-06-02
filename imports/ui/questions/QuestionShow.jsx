import React, { PropTypes } from 'react';
import QuestionShape from '../shapes/QuestionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import { Meteor } from 'meteor/meteor';
import QuestionForm from './QuestionForm';
import QuestionContent from './QuestionContent';
import LoadingIcon from '../shared/LoadingIcon';

const propTypes = {
  question: QuestionShape.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  deleteQuestion: PropTypes.func,
  updateQuestion: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
};

const defaultProps = {
  deleteQuestion: () => {},
  updateQuestion: () => {},
};

class QuestionShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };

    this.edit = this.edit.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
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
    this.props.deleteQuestion(questionId);
    this.transitionToIndex();
  }

  edit() {
    this.setState({ isEditing: true });
  }

  updateQuestion(question, data) {
    this.props.updateQuestion(question._id, data);
    this.setState({ isEditing: false });
  }

  render() {
    const { question, isAdmin, isLoading } = this.props;

    if (isLoading) {
      return <LoadingIcon />;
    } else {
      const { content, title } = question;
      if (this.state.isEditing) {
        return (
          <QuestionForm
            onSubmit={(data) => this.updateQuestion(question, data)}
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
    }
  }
}

QuestionShow.propTypes = propTypes;
QuestionShow.defaultProps = defaultProps;

QuestionShow.contextTypes = {
  router: PropTypes.object,
};

export default createContainer((props) => {
  const id = props.params.id;
  const questionHandle = Meteor.subscribe('question', id);
  const isLoading = !questionHandle.ready();
  const userId = Meteor.userId();
  return Object.assign(
    {
      question: Questions.findOne(id),
      deleteQuestion: questionId => Meteor.call('questions.remove', questionId),
      updateQuestion: (questionId, data) => Meteor.call('questions.update', questionId, data),
      isLoading,
      // For some reason, using context like in QuestionNew and AdminApp to access isLoggedIn and
      // isAdmin doesn't trigger componentDidUpdate when the user logs out. So handle it here
      // instead, which unfortunately duplicates the logic
      isAdmin: !!userId && Roles.userIsInRole(userId, ['admin']),
    },
    // Pass through everything that came from the router
    props
  );
}, QuestionShow);
