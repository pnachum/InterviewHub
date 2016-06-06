import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Solutions } from '../solutions/solutions';

class QuestionsCollection extends Mongo.Collection {
  // Override remove to cascade-delete associated solutions
  remove(selector, callback) {
    Solutions.remove({ questionId: selector });
    return super.remove(selector, callback);
  }
}

export const Questions = new QuestionsCollection('Questions');
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

// Deny all client-side updates
Questions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
