// @flow

import React, { PropTypes } from 'react';

type Props = {
  children: any,
};

export default function QuestionApp({ children }: Props) {
  return (
    <div>{children}</div>
  );
}
