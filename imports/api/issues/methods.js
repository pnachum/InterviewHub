import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Issues } from './issues';

export const insert = new ValidatedMethod({
  name: 'issues.insert',
  validate: new SimpleSchema({
    questionId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
    content: { type: String },
  }).validator(),
  run({ questionId, content }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Issues.insert({
      createdAt: new Date(),
      userId: this.userId,
      questionId,
      content,
    });
  },
});

