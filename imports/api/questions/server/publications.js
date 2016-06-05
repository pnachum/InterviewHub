import { Meteor } from 'meteor/meteor';
import { Questions } from '../questions'
import { Solutions } from '../../solutions/solutions';
import { isUserAdmin } from '../../../helpers/Roles';

if (Meteor.isServer) {
  Meteor.publish('questions.approved', function approvedQuestionsPublication() {
    return Questions.find({ status: 'approved' });
  });

  Meteor.publish('questions.all', function allQuestionsPublication() {
    if (isUserAdmin(this.userId)) {
      return Questions.find({});
    } else {
      this.stop();
      return;
    }
  });

  Meteor.publishComposite('question', function(questionId) {
    return {
      find() {
        const question = Questions.findOne(questionId);
        if (question.status === 'approved' || isUserAdmin(this.userId)) {
          return Questions.find(questionId);
        } else {
          this.stop();
          return;
        }
      },
      children: [{
        find(question) {
          if (question.status === 'approved' || isUserAdmin(this.userId)) {
            return question.solutions();
          } else {
            this.stop();
            return;
          }
        },
      }],
    };
  });
}
