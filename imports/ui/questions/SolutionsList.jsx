import React, { PropTypes } from 'react';
import SolutionShape from '../shapes/SolutionShape';
import MarkdownEditor from './MarkdownEditor';
import Markdown from 'react-remarkable';
import { SubmitButton } from '../shared/Buttons';

const propTypes = {
  solutions: PropTypes.arrayOf(SolutionShape).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default class SolutionsList extends React.Component {
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
    const newContent = this.state.newContent;
    this.props.onSubmit(newContent);
    this.setState({ newContent: '' });
  }

  render() {
    const { solutions, onSubmit } = this.props;
    const { newContent } = this.state;
    return (
      <div>
        {solutions.map(({ _id, content }) => {
          return (
            <div key={_id}>
              <Markdown source={content} />
              <hr />
            </div>
          );
        })}

        <p><strong>Submit a solution</strong></p>
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

SolutionsList.propTypes = propTypes;
