import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { isUserAdmin } from '../../helpers/Roles';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Questions = new Mongo.Collection('Questions');
Questions.schema = new SimpleSchema({
  title: { type: String },
  content: { type: String },
  status: { type: String, defaultValue: 'pending' },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  createdAt: { type: Date },
});
Questions.attachSchema(Questions.schema);

Questions.helpers({
  solutions() {
    return Solutions.find({ questionId: this._id }, { sort: { createdAt: -1 } });
  }
});

// TODO: Figure out why Solutions and associated publications/methods can't be in another file
export const Solutions = new Mongo.Collection('Solutions');
Solutions.schema = new SimpleSchema({
  content: { type: String },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  questionId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  createdAt: { type: Date },
});
Solutions.attachSchema(Solutions.schema);

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
