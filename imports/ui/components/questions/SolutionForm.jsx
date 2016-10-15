// @flow

import React, { PropTypes } from 'react';
import { SubmitButton } from '../shared/Buttons';
import MarkdownEditor from './MarkdownEditor';
import withUserInfo from '../../../helpers/withUserInfo';


type Props = {
  onSubmit: (content: string) => void,
  isLoggedIn: boolean,
};

type DefaultProps = {
  onSubmit: (content: string) => void,
};

type State = {
  newContent: string,
};

const defaultProps = {
  onSubmit: (content) => {},
};

class SolutionForm extends React.Component {
  static defaultProps: DefaultProps;
  props: Props;
  state: State;
  newContentChanged: (e: Event) => void;
  onSubmit: () => void;

  constructor(props: Props) {
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
    const { isLoggedIn } = this.props;
    return (
      <div>
        <MarkdownEditor
          value={newContent}
          onChange={this.newContentChanged}
        />

        <SubmitButton
          disabled={!newContent || !isLoggedIn}
          onClick={this.onSubmit}
        />
        {!isLoggedIn && <div>You must be logged in to submit solutions</div>}
      </div>
    );
  }
}

SolutionForm.defaultProps = defaultProps;
export default withUserInfo(SolutionForm);
