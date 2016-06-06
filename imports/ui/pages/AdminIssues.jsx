import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Issues } from '../../api/issues/issues';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';

const propTypes = {

};

function getEmail(user) {
  return user ? user.emails[0].address : null;
}

export default function AdminIssues({ issues, isLoading }) {
  return (
    <Table>
      <tbody>
        {issues.map(issue => {
          return (
            <tr key={issue._id}>
              <td>
                <Link to={`/${issue.questionId}`}>{issue.question().title}</Link>
              </td>

              <td>
                {getEmail(issue.author())}
              </td>

              <td>
                {issue.content}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

AdminIssues.propTypes = propTypes;

export default createContainer(() => {
  const issuesHandle = Meteor.subscribe('issues');
  const questionsHandle = Meteor.subscribe('questions.all');
  const isLoading = !issuesHandle.ready() || !questionsHandle.ready();
  return {
    issues: Issues.find({}, { sort: { createdAt: -1 } }).fetch(),
    isLoading,
  };
}, AdminIssues);
