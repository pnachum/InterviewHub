import React, { PropTypes } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { SubmitButton } from '../shared/Buttons';
import { PageHeader } from 'react-bootstrap';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // Pre-populate the form if these are specified
  content: PropTypes.string,
  title: PropTypes.string,
};

function canSubmit({ title, content, isLoggedIn }) {
  return isLoggedIn && title && title.length && content && content.length;
}

export default class QuestionForm extends React.Component {

  constructor(props) {
    super(props);
    const { content, title } = props;
    this.state = {
      title: title || '',
      content: content || '',
    };

    this.onContentChange = this.onContentChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onContentChange(e) {
    this.setState({ content: e.target.value });
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    const { onSubmit } = this.props;
    const { isLoggedIn } = this.context;
    const { title, content } = this.state;

    return (
      <div>
        <PageHeader>
          <input
            placeholder="Title"
            value={title}
            onChange={this.onTitleChange}
          />
        </PageHeader>

        <div className="row">
          <MarkdownEditor
            value={content}
            onChange={this.onContentChange}
          />
        </div>

        <SubmitButton
          onClick={() => onSubmit({ title, content })}
          disabled={!canSubmit({ title, content, isLoggedIn })}
        />
        {!isLoggedIn && <div>You must be logged in to submit questions</div>}
      </div>
    );
  }
}

QuestionForm.propTypes = propTypes;
QuestionForm.contextTypes = {
  isLoggedIn: PropTypes.bool,
};
