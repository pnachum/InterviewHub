// @flow

import React, { PropTypes } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { SubmitButton } from '../shared/Buttons';
import { PageHeader } from 'react-bootstrap';
import withUserInfo from '../../../helpers/withUserInfo';

type Props = {
  onSubmit: (data: { title: string, content: string }) => void,
  // Pre-populate the form if these are specified
  content: string,
  title: string,
  isLoggedIn: boolean,
};

type State = {
  title: string,
  content: string,
}

function canSubmit({ title, content, isLoggedIn }) {
  return isLoggedIn && title && title.length && content && content.length;
}

class QuestionForm extends React.Component {
  props: Props;
  state: State;
  onContentChange: (e: Event) => void;
  onTitleChange: (e: Event) => void;

  constructor(props: Props) {
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
    const { onSubmit, isLoggedIn } = this.props;
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

export default withUserInfo(QuestionForm);
