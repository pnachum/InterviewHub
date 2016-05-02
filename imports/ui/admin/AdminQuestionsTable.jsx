import React, { PropTypes } from 'react';
import QuestionRow from './QuestionRow';
import QuestionShape from '../shapes/QuestionShape';

const propTypes = {
  questions: PropTypes.arrayOf(QuestionShape),
};

export default class AdminQuestionsTable extends React.Component {

  render() {
    const { questions, onReject, onApprove, onDelete } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {
            questions.map((question, index) => {
              return (
                <QuestionRow
                  question={question}
                  key={question._id}
                  onDelete={(e) => onDelete(question)}
                  onApprove={(e) => onApprove(question)}
                  onReject={(e) => onReject(question)}
                />
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

AdminQuestionsTable.propTypes = propTypes;
