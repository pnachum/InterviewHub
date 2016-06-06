import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Questions } from '../questions/questions';

export const Issues = new Mongo.Collection('Issues');
Issues.schema = new SimpleSchema({
  content: { type: String },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  questionId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  createdAt: { type: Date },
});
Issues.attachSchema(Issues.schema);

Issues.helpers({
  question() {
    return Questions.findOne({ _id: this.questionId });
  },

  author() {
    return Meteor.users.findOne({ _id: this.userId });
  },
});

// Deny all client-side updates
Issues.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
