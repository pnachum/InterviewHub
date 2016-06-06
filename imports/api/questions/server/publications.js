import { Meteor } from 'meteor/meteor';
import { Questions } from '../questions'
import { Solutions } from '../../solutions/solutions';
import { isUserAdmin } from '../../../helpers/Roles';

if (Meteor.isServer) {
  Meteor.publish('questions.approved', function approvedQuestions() {
    return Questions.find({ status: 'approved' });
  });

  Meteor.publish('questions.all', function allQuestions() {
    if (isUserAdmin(this.userId)) {
      return Questions.find({});
    } else {
      return this.ready();
    }
  });

  Meteor.publishComposite('question', function questionWithSolutions(questionId) {
    return {
      find() {
        const question = Questions.findOne(questionId);
        if (question.status === 'approved' || isUserAdmin(this.userId)) {
          return Questions.find(questionId);
        } else {
          return this.ready();
        }
      },
      children: [{
        find(question) {
          if (question.status === 'approved' || isUserAdmin(this.userId)) {
            return question.solutions();
          } else {
            return this.ready();
          }
        },
      }],
    };
  });
}
