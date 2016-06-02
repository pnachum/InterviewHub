import React, { PropTypes } from 'react';
import { SubmitButton } from '../shared/Buttons';
import MarkdownEditor from './MarkdownEditor';

const propTypes = {
  onSubmit: PropTypes.func,
};

const defaultProps = {
  onSubmit: () => {},
};

export default class SolutionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newContent: '',
    };

    this.newContentChanged = this.newContentChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  newContentChanged(e) {
    this.setState({ newContent: e.target.value });
  }

  onSubmit() {
    this.props.onSubmit(this.state.newContent);
    this.setState({ newContent: '' });
  }

  render() {
    const { newContent } = this.state;
    return (
      <div>
        <div className="row">
          <MarkdownEditor
            value={newContent}
            onChange={this.newContentChanged}
          />
        </div>

        <SubmitButton
          disabled={!newContent}
          onClick={this.onSubmit}
        />
      </div>
    );
  }
}

SolutionForm.propTypes = propTypes;
SolutionForm.defaultProps = defaultProps;
