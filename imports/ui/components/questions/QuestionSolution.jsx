import React, { PropTypes } from 'react';
import Markdown from 'react-remarkable';
import MarkdownEditor from './MarkdownEditor';
import { update } from '../../../api/solutions/methods';
import { createContainer } from 'meteor/react-meteor-data';
import type { Solution } from '../../shapes/SolutionShape';

type Props = {
  solution: Solution,
};

type State = {
  isEditing: boolean,
  editedValue: string,
};

class QuestionSolution extends React.Component {
  props: Props;
  state: State;
  onChange: (e: Event) => void;
  edit: () => void;
  doneEditing: () => void;

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      editedValue: props.solution.content,
    };

    this.onChange = this.onChange.bind(this);
    this.edit = this.edit.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
  }

  onChange(e: Event) {
    this.setState({ editedValue: e.target.value });
  }

  edit() {
    this.setState({ isEditing: true });
  }

  doneEditing() {
    const { updateSolutionContent, solution } = this.props;
    const { editedValue } = this.state;
    this.setState({ isEditing: false });
    updateSolutionContent(solution._id, solution.userId, editedValue);
  }

  render() {
    const { solution } = this.props;
    const { isEditing, editedValue } = this.state;
    return (
      <div>
        {isEditing ? (
          <MarkdownEditor
            value={editedValue}
            onChange={this.onChange}
            onBlur={this.doneEditing}
          />
        ) : (
          <div onClick={this.edit}>
            <Markdown source={solution.content} />
          </div>
        )}
        <hr />
      </div>
    );
  }
}

export default createContainer((props) => {
  return Object.assign(
    {
      updateSolutionContent: (solutionId, userId, newContent) => (
        update.call({ solutionId, userId, newContent })
      ),
    },
    // Pass through everything that came from the router
    props
  );
}, QuestionSolution);
