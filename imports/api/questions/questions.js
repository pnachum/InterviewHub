import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isUserAdmin } from '../../helpers/Roles';

export const Questions = new Mongo.Collection('Questions');
// TODO: Figure out why Solutions and associated publications/methods can't be in another file
export const Solutions = new Mongo.Collection('Solutions');

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
            return Solutions.find({ questionId: question._id });
          } else {
            this.stop();
            return;
          }
        },
      }],
    };
  });
}

Meteor.methods({
  'questions.insert'({ title, content }) {
    check(title, String);
    check(content, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Questions.insert({
      createdAt: new Date(),
      status: 'pending',
      userId: this.userId,
      title,
      content,
    });
  },

  'questions.remove'(questionId) {
    check(questionId, String);

    if (isUserAdmin(this.userId)) {
      Questions.remove(questionId);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },

  'questions.update'(questionId, data) {
    check(questionId, String);
    check(data, Object);

    if (isUserAdmin(this.userId)) {
      Questions.update(questionId, { $set: data });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },

  'solutions.insert'(questionId, content) {
    check(questionId, String);
    check(content, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Solutions.insert({
      createdAt: new Date(),
      userId: this.userId,
      questionId,
      content,
    });
  },
});
