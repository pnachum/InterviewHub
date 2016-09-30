import React, { PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const propTypes = {
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: () => {},
};

export function DeleteButton(props) {
  return (
    <Button
      bsStyle="danger"
      title="Delete"
      {...props}
    >
      <Glyphicon glyph="trash" />
    </Button>
  );
}

export function EditButton(props) {
  return (
    <Button
      bsStyle="warning"
      title="Edit"
      {...props}
    >
      <Glyphicon glyph="pencil" />
    </Button>
  );
}

function GreenButton(props) {
  return (
    <Button
      bsStyle="success"
      {...props}
    >
      {props.children}
    </Button>
  );
}

export function SubmitButton(props) {
  return (
    <GreenButton {...props}>
      Submit
    </GreenButton>
  );
}

export function ApproveButton(props) {
  return (
    <GreenButton {...props} title="Approve">
      <Glyphicon glyph="ok" />
    </GreenButton>
  );
}

export function RejectButton(props) {
  return (
    <GreenButton {...props} title="Reject">
      <Glyphicon glyph="remove" />
    </GreenButton>
  );
}

export function LinkButton(props) {
  return (
    <Button bsStyle="link" {...props}>
      {props.children}
    </Button>
  );
}

[
  DeleteButton,
  SubmitButton,
  ApproveButton,
  RejectButton,
  SubmitButton,
  LinkButton,
].forEach(component => {
  component.propTypes = propTypes;
  component.defaultProps = defaultProps;
});
