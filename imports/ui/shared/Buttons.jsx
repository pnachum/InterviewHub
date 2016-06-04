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
    <GreenButton {...props}
    >
      <Glyphicon glyph="ok" />
    </GreenButton>
  );
}

export function RejectButton(props) {
  return (
    <GreenButton {...props}
    >
      <Glyphicon glyph="remove" />
    </GreenButton>
  );
}

DeleteButton.propTypes = propTypes;
SubmitButton.propTypes = propTypes;
ApproveButton.propTypes = propTypes;
RejectButton.propTypes = propTypes;
SubmitButton.propTypes = propTypes;
