// React dependencies
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';

// Meteor dependencies
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Methods
import { remove, update } from '../../api/questions/methods.js';
import { insert } from '../../api/solutions/methods.js';

// Shapes
import QuestionShape from '../shapes/QuestionShape';
import SolutionShape from '../shapes/SolutionShape';

// Components
import QuestionForm from '../components/questions/QuestionForm';
import QuestionContent from '../components/questions/QuestionContent';
import LoadingIcon from '../components/shared/LoadingIcon';
import { DeleteButton, EditButton } from '../components/shared/Buttons';
import QuestionSolutions from '../components/questions/QuestionSolutions';

// Misc
import { Questions } from '../../api/questions/questions';
import { isUserAdmin } from '../../helpers/Roles';

const propTypes = {
  question: QuestionShape,
  solutions: PropTypes.arrayOf(SolutionShape).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  deleteQuestion: PropTypes.func,
  updateQuestion: PropTypes.func,
  submitSolution: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  router: PropTypes.object,
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
    this.props.router.push('/');
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

    const { isEditing } = this.state;

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
            <QuestionContent question={question} />

            <QuestionSolutions
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

const MeteorContainer = createContainer((props) => {
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
      submitSolution: (questionId, content) => insert.call({ questionId, content }),
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

export default withRouter(MeteorContainer);
