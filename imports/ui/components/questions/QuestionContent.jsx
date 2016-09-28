// @flow

import React, { PropTypes } from 'react';
import type { Question } from '../../shapes/QuestionShape';
import Markdown from 'react-remarkable';
import { PageHeader } from 'react-bootstrap';

type Props = {
  question: Question,
};

export default function QuestionContent({ question }: Props) {
  const { title, content } = question;

  return (
    <div>
      <PageHeader>{title}</PageHeader>
      <div>
        <Markdown source={content} />
      </div>
    </div>
  );
}
