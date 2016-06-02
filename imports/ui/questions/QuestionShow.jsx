import React, { PropTypes } from 'react';
import QuestionShape from '../shapes/QuestionShape';
import SolutionShape from '../shapes/SolutionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions, Solutions } from '../../api/questions/questions';
import { Meteor } from 'meteor/meteor';
import QuestionForm from './QuestionForm';
import QuestionContent from './QuestionContent';
import LoadingIcon from '../shared/LoadingIcon';
import { DeleteButton, EditButton } from '../shared/Buttons';

const propTypes = {
  question: QuestionShape,
  solutions: PropTypes.arrayOf(SolutionShape).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  deleteQuestion: PropTypes.func,
  updateQuestion: PropTypes.func,
  submitSolution: PropTypes.func,
  isLoadingQuestion: PropTypes.bool.isRequired,
};

const defaultProps = {
  deleteQuestion: () => {},
  updateQuestion: () => {},
  submitSolution: () => {},
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

  deleteQuestion() {
    this.props.deleteQuestion(this.props.question._id);
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
    const {
      question,
      solutions,
      isAdmin,
      isLoadingQuestion,
      submitSolution,
    } = this.props;

    if (isLoadingQuestion) {
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
          <div>
            {isAdmin && (
              <div>
                <DeleteButton onClick={this.deleteQuestion} />
                <EditButton onClick={this.edit} />
              </div>
            )}
            <QuestionContent
              question={question}
              solutions={solutions}
              onSolutionSubmit={(content) => submitSolution(question._id, content)}
            />
          </div>
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
  const isLoadingQuestion = !questionHandle.ready();
  Meteor.subscribe('solutions.forQuestion', id);
  const question = Questions.findOne(id);
  const solutions = Solutions.find({ questionId: id }).fetch();
  const userId = Meteor.userId();
  return Object.assign(
    {
      deleteQuestion: questionId => Meteor.call('questions.remove', questionId),
      updateQuestion: (questionId, data) => Meteor.call('questions.update', questionId, data),
      submitSolution: (questionId, content) => Meteor.call('solutions.insert', questionId, content),
      solutions,
      isLoadingQuestion,
      question,
      // For some reason, using context like in QuestionNew and AdminApp to access isLoggedIn and
      // isAdmin doesn't trigger componentDidUpdate when the user logs out. So handle it here
      // instead, which unfortunately duplicates the logic
      isAdmin: !!userId && Roles.userIsInRole(userId, ['admin']),
    },
    // Pass through everything that came from the router
    props
  );
}, QuestionShow);
