import React, { PropTypes } from 'react';
import QuestionShape from '../shapes/QuestionShape';
import SolutionShape from '../shapes/SolutionShape';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions';
import { Meteor } from 'meteor/meteor';
import QuestionForm from '../components/questions/QuestionForm';
import QuestionContent from '../components/questions/QuestionContent';
import LoadingIcon from '../components/shared/LoadingIcon';
import { DeleteButton, EditButton } from '../components/shared/Buttons';
import QuestionSolutions from '../components/questions/QuestionSolutions';
import { isUserAdmin } from '../../helpers/Roles';
import { remove, update } from '../../api/questions/methods.js';
import { insert as insertSolution } from '../../api/solutions/methods.js';
import { insert as insertIssue } from '../../api/issues/methods.js';
import IssueModal from '../components/questions/IssueModal';

const propTypes = {
  question: QuestionShape,
  solutions: PropTypes.arrayOf(SolutionShape).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  deleteQuestion: PropTypes.func,
  updateQuestion: PropTypes.func,
  submitSolution: PropTypes.func,
  submitIssue: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
};

const defaultProps = {
  deleteQuestion: () => {},
  updateQuestion: () => {},
  submitSolution: () => {},
  submitIssue: () => {},
};

class QuestionShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      showIssueModal: false,
    };

    this.edit = this.edit.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onIssueSubmit = this.onIssueSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const { isAdmin, question } = this.props;
    // When an admin is on this page and logs out
    if (!isAdmin && (question == null || question.status !== 'approved')) {
      this.transitionToIndex();
    }
  }

  openModal() {
    this.setState({ showIssueModal: true });
  }

  onIssueSubmit(issueContent) {
    const questionId = this.props.question._id;
    const userId = this.props.userId;
    this.props.submitIssue(this.props.question._id, issueContent);
    this.closeModal();
  }

  closeModal() {
    this.setState({ showIssueModal: false });
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

  updateQuestion(data) {
    this.props.updateQuestion(this.props.question._id, data);
    this.setState({ isEditing: false });
  }

  render() {
    const {
      question,
      solutions,
      isAdmin,
      isLoading,
      submitSolution,
    } = this.props;

    const { isEditing, showIssueModal } = this.state;

    if (isLoading) {
      return <LoadingIcon />;
    } else {
      const { content, title } = question;
      if (isEditing) {
        return (
          <QuestionForm
            onSubmit={this.updateQuestion}
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
            <button onClick={this.openModal}>Submit an issue</button>
            <QuestionContent question={question} />

            <QuestionSolutions
              solutions={solutions}
              onSolutionSubmit={(content) => submitSolution(question._id, content)}
            />

            {showIssueModal && (
              <IssueModal
                onSubmit={this.onIssueSubmit}
                onHide={this.closeModal}
              />
            )}

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
  const isLoading = !questionHandle.ready();
  const question = Questions.findOne(id);
  const solutions = isLoading ? [] : question.solutions().fetch();
  const userId = Meteor.userId();
  return Object.assign(
    {
      deleteQuestion: questionId => remove.call({ questionId }),
      updateQuestion: (questionId, data) => update.call({ questionId, data }),
      submitSolution: (questionId, content) => insertSolution.call({ questionId, content }),
      submitIssue: (questionId, content) => insertIssue.call({ questionId, content }),
      solutions,
      isLoading,
      question,
      // For some reason, using context like in QuestionNew and AdminApp to access
      // isAdmin doesn't trigger componentDidUpdate when the user logs out. So handle it here
      // instead, which unfortunately duplicates the logic
      isAdmin: isUserAdmin(userId),
    },
    // Pass through everything that came from the router
    props
  );
}, QuestionShow);
