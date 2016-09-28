// @flow

import React, { PropTypes } from 'react';
import type { Question } from '../../shapes/QuestionShape';
import { Table } from 'react-bootstrap';
import QuestionRow from './QuestionRow';

type Props = {
  questions: Question[],
  onDelete: (question: Question) => void,
  onApprove: (question: Question) => void,
  onReject: (question: Question) => void,
  hasStatusColumn: boolean,
  hasApprovalColumn: boolean,
  hasDeleteColumn: boolean,
};

type DefaultProps = {
  onDelete: (question: Question) => void,
  onApprove: (question: Question) => void,
  onReject: (question: Question) => void,
  hasStatusColumn: boolean,
  hasApprovalColumn: boolean,
  hasDeleteColumn: boolean,
};

const defaultProps: DefaultProps = {
  onDelete: (question) => {},
  onApprove: (question) => {},
  onReject: (question) => {},
  hasStatusColumn: false,
  hasApprovalColumn: false,
  hasDeleteColumn: false,
};

export default class QuestionsTable extends React.Component {
  props: Props;
  static defaultProps: DefaultProps;

  render() {
    const {
      questions,
      onDelete,
      onApprove,
      onReject,
      hasStatusColumn,
      hasApprovalColumn,
      hasDeleteColumn,
    } = this.props;
    return (
      <Table responsive hover>
        <tbody>
          {questions.map((question) => {
            return (
              <QuestionRow
                question={question}
                key={question._id}
                onDelete={(e) => onDelete(question)}
                onApprove={(e) => onApprove(question)}
                onReject={(e) => onReject(question)}
                hasStatusColumn={hasStatusColumn}
                hasApprovalColumn={hasApprovalColumn}
                hasDeleteColumn={hasDeleteColumn}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

QuestionsTable.defaultProps = defaultProps;
