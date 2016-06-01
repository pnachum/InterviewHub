import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Questions = new Mongo.Collection('Questions');

function isUserAdmin() {
  // Shitty global refernce to alanning/meteor-roles
  return this.userId && Roles.userIsInRole(this.userId, ['admin']);
}

if (Meteor.isServer) {
  Meteor.publish('questions.approved', function approvedQuestionsPublication() {
    return Questions.find({ status: 'approved' });
  });

  Meteor.publish('questions.all', function allQuestionsPublication() {
    if (isUserAdmin.call(this)) {
      return Questions.find({});
    } else {
      this.stop();
      return;
    }
  });

  Meteor.publish('question', function questionPublication(questionId) {
    const question = Questions.findOne(questionId);
    if (question.status === 'approved' || isUserAdmin.call(this)) {
      return Questions.find(questionId);
    } else {
      this.stop();
      return;
    }

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

    if (isUserAdmin.call(this)) {
      Questions.remove(questionId);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },

  'questions.update'(questionId, data) {
    check(questionId, String);
    check(data, Object);

    if (isUserAdmin.call(this)) {
      Questions.update(questionId, { $set: data });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
});
