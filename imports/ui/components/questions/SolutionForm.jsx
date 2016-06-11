import React, { PropTypes } from 'react';
import { SubmitButton } from '../shared/Buttons';
import MarkdownEditor from './MarkdownEditor';
import withUserInfo from '../../../helpers/withUserInfo';

const propTypes = {
  onSubmit: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
};

const defaultProps = {
  onSubmit: () => {},
};

class SolutionForm extends React.Component {
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
    const { isLoggedIn } = this.props;
    return (
      <div>
        <div className="row">
          <MarkdownEditor
            value={newContent}
            onChange={this.newContentChanged}
          />
        </div>

        <SubmitButton
          disabled={!newContent || !isLoggedIn}
          onClick={this.onSubmit}
        />
        {!isLoggedIn && <div>You must be logged in to submit solutions</div>}
      </div>
    );
  }
}

SolutionForm.propTypes = propTypes;
SolutionForm.defaultProps = defaultProps;
export default withUserInfo(SolutionForm);
