// @flow

import React, { PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

type Props = {
  onClick: (e: Event) => void,
  children?: any,
};

type DefaultProps = {
  onClick: () => void,
};

const defaultProps = {
  onClick: () => {},
};

export function DeleteButton(props: Props) {
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

export function EditButton(props: Props) {
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

function GreenButton(props: Props) {
  return (
    <Button
      bsStyle="success"
      {...props}
    >
      {props.children}
    </Button>
  );
}

export function SubmitButton(props: Props) {
  return (
    <GreenButton {...props}>
      Submit
    </GreenButton>
  );
}

export function ApproveButton(props: Props) {
  return (
    <GreenButton {...props} title="Approve">
      <Glyphicon glyph="ok" />
    </GreenButton>
  );
}

export function RejectButton(props: Props) {
  return (
    <GreenButton {...props} title="Reject">
      <Glyphicon glyph="remove" />
    </GreenButton>
  );
}

export function LinkButton(props: Props) {
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
  component.defaultProps = defaultProps;
});
