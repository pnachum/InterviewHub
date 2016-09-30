// @flow

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Solutions = new Mongo.Collection('Solutions');
Solutions.schema = new SimpleSchema({
  content: { type: String },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  questionId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  createdAt: { type: Date },
});
Solutions.attachSchema(Solutions.schema);

// Deny all client-side updates
Solutions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
