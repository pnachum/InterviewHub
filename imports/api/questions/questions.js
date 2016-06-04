import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Questions = new Mongo.Collection('Questions');

function isUserAdmin(userId) {
  // Shitty global refernce to alanning/meteor-roles
  return userId && Roles.userIsInRole(userId, ['admin']);
}

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

  Meteor.publish('question', function questionPublication(questionId) {
    const question = Questions.find(questionId);
    if (question.status === 'approved' || isUserAdmin(this.userId)) {
      return question;
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
});
