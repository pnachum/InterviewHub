import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Solutions } from '../solutions/solutions';

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
