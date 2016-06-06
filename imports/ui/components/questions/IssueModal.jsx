import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { SubmitButton } from '../shared/Buttons';

const propTypes = {
  show: PropTypes.bool,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  show: false,
  onSubmit: () => {},
}

export default class IssueModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newIssueContent: '',
    };

    this.onContentChange = this.onContentChange.bind(this);
  }

  onContentChange(e) {
    this.setState({ newIssueContent: e.target.value });
  }

  render() {
    const { show, onSubmit, onHide } = this.props;
    const { newIssueContent } = this.state;

    return (
      <Modal onHide={onHide} show keyboard>
        <Modal.Header>
          <h4>Submit any issues, questions, or concerns you have with this question.</h4>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={newIssueContent}
            onChange={this.onContentChange}
            cols={60}
            rows={10}
          />
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => onSubmit(newIssueContent)} />
        </Modal.Footer>
      </Modal>
    );
  }
}

IssueModal.propTypes = propTypes;
IssueModal.defaultProps = defaultProps;
